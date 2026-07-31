-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: users (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    stress_threshold INT DEFAULT 80,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: wearable_connections (Stores OAuth tokens & Provider IDs)
CREATE TABLE public.wearable_connections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- 'terra', 'rook', 'apple', 'oura'
    provider_user_id TEXT NOT NULL,
    access_token TEXT, -- Encrypted at application layer
    refresh_token TEXT, -- Encrypted at application layer
    token_expires_at TIMESTAMPTZ,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, provider)
);

-- Table: biometric_events (High-throughput telemetry)
CREATE TABLE public.biometric_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL,
    stress_score INT NOT NULL,
    hrv_ms NUMERIC,
    raw_payload JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: calendar_actions_log (Auditing automated modifications)
CREATE TABLE public.calendar_actions_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.biometric_events(id),
    action_type TEXT NOT NULL, -- 'block_created', 'meeting_shifted', 'manual_approval_requested'
    google_event_id TEXT,
    description TEXT,
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wearable_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biometric_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_actions_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only read/write their own data
CREATE POLICY "Users can manage their own data" ON public.users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage their own connections" ON public.wearable_connections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their telemetry" ON public.biometric_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their calendar logs" ON public.calendar_actions_log FOR SELECT USING (auth.uid() = user_id);
