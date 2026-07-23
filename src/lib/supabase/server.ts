import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side client, scoped to the signed-in admin's session (respects RLS).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component render; the proxy refreshes
            // the session cookie instead, so this can be safely ignored.
          }
        },
      },
    }
  );
}
