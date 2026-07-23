"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function marcarMensagemLida(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("mensagens_contato").update({ lida: true }).eq("id", id);
  if (error) console.error("marcarMensagemLida:", error);

  revalidatePath("/admin/mensagens");
  revalidatePath("/admin");
}

export async function atualizarStatusSubmissao(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !status) return;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("submissoes_imoveis")
    .update({ status, revisada: true })
    .eq("id", id);
  if (error) console.error("atualizarStatusSubmissao:", error);

  revalidatePath("/admin/submissoes");
  revalidatePath("/admin");
}
