"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "imoveis";

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

async function uploadFotos(formData: FormData): Promise<string[]> {
  const supabase = createAdminClient();
  const arquivos = formData.getAll("fotos").filter(
    (f): f is File => f instanceof File && f.size > 0
  );

  const urls: string[] = [];
  for (const arquivo of arquivos) {
    const extensao = arquivo.name.split(".").pop() || "jpg";
    const caminho = `${randomUUID()}.${extensao}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(caminho, arquivo, { contentType: arquivo.type, upsert: false });

    if (error) {
      console.error("uploadFotos:", error);
      continue;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(caminho);
    urls.push(data.publicUrl);
  }
  return urls;
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

  const novasFotos = await uploadFotos(formData);
  const dados = montarDadosImovel(formData);

  const supabase = createAdminClient();
  const { error } = await supabase.from("imoveis").insert({ ...dados, fotos: novasFotos });

  if (error) {
    console.error("criarImovel:", error);
    throw new Error("Não foi possível criar o imóvel.");
  }

  revalidatePath("/admin/imoveis");
  revalidatePath("/imoveis");
  revalidatePath("/");
  redirect("/admin/imoveis?sucesso=criado");
}

export async function atualizarImovel(formData: FormData) {
  await requireAdmin();

  const id = campoTexto(formData, "id");
  if (!id) throw new Error("Imóvel inválido.");

  const fotosMantidas = formData.getAll("manter_fotos").map(String);
  const novasFotos = await uploadFotos(formData);
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

  revalidatePath("/admin/imoveis");
  revalidatePath(`/imoveis/${id}`);
  revalidatePath("/imoveis");
  revalidatePath("/");
  redirect("/admin/imoveis?sucesso=atualizado");
}

export async function excluirImovel(formData: FormData) {
  await requireAdmin();
  const id = campoTexto(formData, "id");
  if (!id) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("imoveis").delete().eq("id", id);
  if (error) console.error("excluirImovel:", error);

  revalidatePath("/admin/imoveis");
  revalidatePath("/imoveis");
  revalidatePath("/");
}
