"use server";

import { createClient } from "@/lib/supabase/server";

export type EstadoFormulario = { ok: boolean; erro?: string };

export async function enviarMensagemContato(
  _estadoAnterior: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  const nome = String(formData.get("nome") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const imovelId = String(formData.get("imovel_id") ?? "").trim();

  if (!nome || !mensagem) {
    return { ok: false, erro: "Preencha nome e mensagem." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("mensagens_contato").insert({
    nome,
    mensagem,
    telefone: telefone || null,
    email: email || null,
    imovel_id: imovelId || null,
  });

  if (error) {
    console.error("enviarMensagemContato:", error);
    return { ok: false, erro: "Não foi possível enviar agora. Tente novamente." };
  }

  return { ok: true };
}

export async function enviarSubmissaoImovel(
  _estadoAnterior: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  const nome = String(formData.get("nome") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const tipo = String(formData.get("tipo") ?? "").trim();
  const endereco = String(formData.get("endereco") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim();
  const precoStr = String(formData.get("preco_pretendido") ?? "").trim();

  if (!nome || !telefone) {
    return { ok: false, erro: "Preencha ao menos nome e telefone." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("submissoes_imoveis").insert({
    nome,
    telefone,
    email: email || null,
    tipo: tipo || null,
    endereco: endereco || null,
    descricao: descricao || null,
    preco_pretendido: precoStr ? Number(precoStr) : null,
  });

  if (error) {
    console.error("enviarSubmissaoImovel:", error);
    return { ok: false, erro: "Não foi possível enviar agora. Tente novamente." };
  }

  return { ok: true };
}
