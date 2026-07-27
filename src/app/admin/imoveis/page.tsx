import { redirect } from "next/navigation";

// The properties list now lives on the main admin dashboard.
export default function AdminImoveisRedirectPage() {
  redirect("/admin");
}
