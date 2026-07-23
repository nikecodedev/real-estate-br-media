import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client: bypasses Row Level Security. Server-only, and every
// Server Action that uses it must verify an authenticated admin session first
// (see requireAdmin in lib/auth.ts).
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
