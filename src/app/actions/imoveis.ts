"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

function campoTexto(formData: FormData, nome: string): string {
  return String(formData.get(nome) ?? "").trim();
}

function campoNumero(formData: FormData, nome: string): number {
  const v = campoTexto(formData, nome);
  return v ? Number(v) : 0;
}

function campoNumeroOuNulo(formData: FormData, nome: string): number | null {
  const v = campoTexto(formData, nome);
  return v ? Number(v) : null;
}

function montarDadosImovel(formData: FormData) {
  const caracteristicasRaw = campoTexto(formData, "caracteristicas");

  return {
    titulo: campoTexto(formData, "titulo"),
    tipo: campoTexto(formData, "tipo"),
    status: campoTexto(formData, "status") || "disponivel",
    destaque: formData.get("destaque") === "on",
    preco: campoNumeroOuNulo(formData, "preco"),
    finalidade: campoTexto(formData, "finalidade") || "venda",
    endereco: campoTexto(formData, "endereco"),
    bairro: campoTexto(formData, "bairro"),
    cidade: campoTexto(formData, "cidade") || "Seabra",
    estado: campoTexto(formData, "estado") || "BA",
    area_m2: campoTexto(formData, "area_m2") ? campoNumero(formData, "area_m2") : null,
    quartos: campoNumero(formData, "quartos"),
    banheiros: campoNumero(formData, "banheiros"),
    vagas: campoNumero(formData, "vagas"),
    caracteristicas: caracteristicasRaw
      ? caracteristicasRaw.split(",").map((c) => c.trim()).filter(Boolean)
      : [],
    descricao: campoTexto(formData, "descricao") || null,
    video_url: campoTexto(formData, "video_url") || null,
  };
}

export async function criarImovel(formData: FormData) {
  await requireAdmin();

  const novasFotos = formData.getAll("fotos_novas").map(String).filter(Boolean);
  const dados = montarDadosImovel(formData);

  const supabase = createAdminClient();

  // Guard against double-submits (double click, slow network + retry) creating
  // the same listing twice: same title + address within the last couple of
  // minutes is treated as a duplicate rather than a new listing.
  const doisMinutosAtras = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  const { data: existente } = await supabase
    .from("imoveis")
    .select("id")
    .eq("titulo", dados.titulo)
    .eq("endereco", dados.endereco)
    .gte("criado_em", doisMinutosAtras)
    .limit(1)
    .maybeSingle();

  if (existente) {
    revalidatePath("/admin");
    redirect("/admin?sucesso=duplicado");
  }

  const { error } = await supabase.from("imoveis").insert({ ...dados, fotos: novasFotos });

  if (error) {
    console.error("criarImovel:", error);
    throw new Error("Não foi possível criar o imóvel.");
  }

  revalidatePath("/admin");
  revalidatePath("/imoveis");
  revalidatePath("/");
  redirect("/admin?sucesso=criado");
}

export async function atualizarImovel(formData: FormData) {
  await requireAdmin();

  const id = campoTexto(formData, "id");
  if (!id) throw new Error("Imóvel inválido.");

  const fotosMantidas = formData.getAll("manter_fotos").map(String);
  const novasFotos = formData.getAll("fotos_novas").map(String).filter(Boolean);
  const dados = montarDadosImovel(formData);

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("imoveis")
    .update({ ...dados, fotos: [...fotosMantidas, ...novasFotos] })
    .eq("id", id);

  if (error) {
    console.error("atualizarImovel:", error);
    throw new Error("Não foi possível atualizar o imóvel.");
  }

  revalidatePath("/admin");
  revalidatePath(`/imoveis/${id}`);
  revalidatePath("/imoveis");
  revalidatePath("/");
  redirect("/admin?sucesso=atualizado");
}

export async function excluirImovel(formData: FormData) {
  await requireAdmin();
  const id = campoTexto(formData, "id");
  if (!id) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("imoveis").delete().eq("id", id);
  if (error) console.error("excluirImovel:", error);

  revalidatePath("/admin");
  revalidatePath("/imoveis");
  revalidatePath("/");
  redirect("/admin?sucesso=excluido");
}
