import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

function firstNonEmpty(...vals: (string | undefined)[]): string | undefined {
  return vals.find((v) => typeof v === 'string' && v.trim().length > 0);
}

export function getSupabase(): SupabaseClient {
  if (!cachedClient) {
    const supabaseUrl =
      firstNonEmpty(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_URL
      ) || 'https://placeholder.supabase.co';

    const supabaseKey =
      firstNonEmpty(
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        process.env.SUPABASE_ANON_KEY,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      ) || 'placeholder-key-to-prevent-build-crashes';

    cachedClient = createClient(supabaseUrl, supabaseKey);
  }
  return cachedClient;
}