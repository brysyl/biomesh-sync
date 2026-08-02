-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core User Baselines: Stores auth tokens and physiological averages
CREATE TABLE public.user_baselines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_user_id VARCHAR(255) NOT NULL UNIQUE,
    baseline_hrv DECIMAL(5,2) NOT NULL,
    baseline_rhr DECIMAL(5,2) NOT NULL,
    calendar_access_token TEXT NOT NULL,
    calendar_refresh_token TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Telemetry Engine: For Investor Metrics & Operational Logging
CREATE TABLE public.telemetry_calendar_defenses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    hrv_drop_percentage DECIMAL(5,2),
    rhr_spike_percentage DECIMAL(5,2),
    meetings_cleared INTEGER DEFAULT 0,
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- High-Performance Indexing for Zero-Latency Lookups
CREATE INDEX idx_user_baselines_provider ON public.user_baselines(provider_user_id);
CREATE INDEX idx_telemetry_executed_at ON public.telemetry_calendar_defenses(executed_at);
CREATE INDEX idx_telemetry_provider ON public.telemetry_calendar_defenses(provider);

-- RLS Policies
ALTER TABLE public.user_baselines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry_calendar_defenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own baseline" 
ON public.user_baselines FOR SELECT 
TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "System can read all telemetry" 
ON public.telemetry_calendar_defenses FOR SELECT 
TO authenticated USING (true);
