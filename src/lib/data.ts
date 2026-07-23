import { createClient } from "@/lib/supabase/server";
import type { FiltrosImoveis, Imovel } from "@/lib/types";

export async function getDestaques(limite = 6): Promise<Imovel[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("imoveis")
      .select("*")
      .eq("destaque", true)
      .eq("status", "disponivel")
      .order("criado_em", { ascending: false })
      .limit(limite);

    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("getDestaques:", err);
    return [];
  }
}

export async function getImoveis(filtros: FiltrosImoveis = {}): Promise<Imovel[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from("imoveis").select("*").order("criado_em", { ascending: false });

    if (filtros.busca) {
      const termo = filtros.busca.trim();
      query = query.or(
        `titulo.ilike.%${termo}%,endereco.ilike.%${termo}%,bairro.ilike.%${termo}%,cidade.ilike.%${termo}%`
      );
    }
    if (filtros.tipo) query = query.eq("tipo", filtros.tipo);
    if (filtros.cidade) query = query.eq("cidade", filtros.cidade);
    if (filtros.precoMin !== undefined) query = query.gte("preco", filtros.precoMin);
    if (filtros.precoMax !== undefined) query = query.lte("preco", filtros.precoMax);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("getImoveis:", err);
    return [];
  }
}

export async function getImovel(id: string): Promise<Imovel | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("imoveis")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("getImovel:", err);
    return null;
  }
}

export async function getCidadesDisponiveis(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("imoveis").select("cidade");
    if (error) throw error;
    return Array.from(new Set((data ?? []).map((r) => r.cidade))).sort();
  } catch (err) {
    console.error("getCidadesDisponiveis:", err);
    return [];
  }
}
