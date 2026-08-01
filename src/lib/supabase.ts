import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!cachedClient) {
    const supabaseUrl = 
      process.env.NEXT_PUBLIC_SUPABASE_URL || 
      process.env.SUPABASE_URL || 
      process.env.supabaseUrl;

    const supabaseKey = 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
      process.env.SUPABASE_ANON_KEY || 
      process.env.SUPABASE_SERVICE_ROLE_KEY || 
      process.env.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase environment variables are missing at runtime.');
    }

    cachedClient = createClient(supabaseUrl, supabaseKey);
  }
  return cachedClient;
}
