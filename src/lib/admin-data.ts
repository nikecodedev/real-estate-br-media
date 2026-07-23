import { createAdminClient } from "@/lib/supabase/admin";
import type { Imovel } from "@/lib/types";

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
