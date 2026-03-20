import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!client) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
      if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
      client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
    }
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
