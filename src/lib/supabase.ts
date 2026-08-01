import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

/**
 * Lazy-initializes and returns the Supabase client.
 * Defers execution until runtime to prevent build-time missing environment variable errors.
 */
export function getSupabase(): SupabaseClient {
  if (!cachedClient) {
    const supabaseUrl = 
      process.env.NEXT_PUBLIC_SUPABASE_URL || 
      process.env.SUPABASE_URL || 
      process.env.supabaseUrl;

    const supabaseKey = 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
      process.env.SUPABASE_ANON_KEY || 
      process.env.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase environment variables (URL/Key) are missing.');
    }

    cachedClient = createClient(supabaseUrl, supabaseKey);
  }
  return cachedClient;
}

// Proxy wrapper so imports like `import { supabase } from '@/lib/supabase'` 
// won't execute instantiation until a database method is actually invoked at runtime.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabase();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
