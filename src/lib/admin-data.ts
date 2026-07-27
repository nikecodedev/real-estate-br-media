import { createAdminClient } from "@/lib/supabase/admin";
import type { Imovel } from "@/lib/types";
import type { ResultadoPaginado } from "@/lib/data";

export interface MensagemContatoRegistro {
  id: string;
  criado_em: string;
  nome: string;
  telefone: string | null;
  email: string | null;
  mensagem: string;
  imovel_id: string | null;
  lida: boolean;
}

export interface SubmissaoImovelRegistro {
  id: string;
  criado_em: string;
  nome: string;
  telefone: string;
  email: string | null;
  tipo: string | null;
  endereco: string | null;
  preco_pretendido: number | null;
  descricao: string | null;
  status: string;
  revisada: boolean;
}

function calcularPaginacao<T>(
  data: T[] | null,
  count: number | null,
  porPagina: number
): ResultadoPaginado<T> {
  const total = count ?? 0;
  return { itens: data ?? [], total, totalPaginas: Math.max(1, Math.ceil(total / porPagina)) };
}

export async function getImoveisAdminPaginado(
  pagina = 1,
  porPagina = 10
): Promise<ResultadoPaginado<Imovel>> {
  const supabase = createAdminClient();
  const de = (pagina - 1) * porPagina;
  const { data, error, count } = await supabase
    .from("imoveis")
    .select("*", { count: "exact" })
    .order("criado_em", { ascending: false })
    .range(de, de + porPagina - 1);
  if (error) throw error;
  return calcularPaginacao(data, count, porPagina);
}

export async function getMensagensPaginado(
  pagina = 1,
  porPagina = 10
): Promise<ResultadoPaginado<MensagemContatoRegistro>> {
  const supabase = createAdminClient();
  const de = (pagina - 1) * porPagina;
  const { data, error, count } = await supabase
    .from("mensagens_contato")
    .select("*", { count: "exact" })
    .order("criado_em", { ascending: false })
    .range(de, de + porPagina - 1);
  if (error) throw error;
  return calcularPaginacao(data, count, porPagina);
}

export async function getSubmissoesPaginado(
  pagina = 1,
  porPagina = 10
): Promise<ResultadoPaginado<SubmissaoImovelRegistro>> {
  const supabase = createAdminClient();
  const de = (pagina - 1) * porPagina;
  const { data, error, count } = await supabase
    .from("submissoes_imoveis")
    .select("*", { count: "exact" })
    .order("criado_em", { ascending: false })
    .range(de, de + porPagina - 1);
  if (error) throw error;
  return calcularPaginacao(data, count, porPagina);
}

export async function getTodosImoveisAdmin(): Promise<Imovel[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("imoveis")
    .select("*")
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getImovelAdmin(id: string): Promise<Imovel | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("imoveis").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getMensagens(): Promise<MensagemContatoRegistro[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("mensagens_contato")
    .select("*")
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getSubmissoes(): Promise<SubmissaoImovelRegistro[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("submissoes_imoveis")
    .select("*")
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getResumoAdmin() {
  const [imoveis, mensagens, submissoes] = await Promise.all([
    getTodosImoveisAdmin(),
    getMensagens(),
    getSubmissoes(),
  ]);

  return {
    totalImoveis: imoveis.length,
    imoveisDisponiveis: imoveis.filter((i) => i.status === "disponivel").length,
    mensagensNaoLidas: mensagens.filter((m) => !m.lida).length,
    submissoesNovas: submissoes.filter((s) => s.status === "novo").length,
  };
}
