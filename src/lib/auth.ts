import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Call at the top of every admin Server Action and admin page render.
// The proxy already redirects unauthenticated requests away from /admin,
// but Server Actions are reachable directly via POST, so this is the real check.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
