export type StatusImovel = "disponivel" | "vendido" | "alugado";
export type FinalidadeImovel = "venda" | "aluguel";
export type TipoImovel = "apartamento" | "casa" | "terreno" | "loteamento" | "comercial" | "rural";

export interface Imovel {
  id: string;
  criado_em: string;
  titulo: string;
  tipo: TipoImovel;
  status: StatusImovel;
  destaque: boolean;
  preco: number | null;
  finalidade: FinalidadeImovel;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  area_m2: number | null;
  quartos: number;
  banheiros: number;
  vagas: number;
  caracteristicas: string[];
  descricao: string | null;
  fotos: string[];
  video_url: string | null;
}

export interface FiltrosImoveis {
  busca?: string;
  tipo?: string;
  cidade?: string;
  finalidade?: string;
  precoMin?: number;
  precoMax?: number;
}

export interface MensagemContato {
  nome: string;
  telefone?: string;
  email?: string;
  mensagem: string;
  imovel_id?: string;
}

export interface SubmissaoImovel {
  nome: string;
  telefone: string;
  email?: string;
  tipo?: string;
  endereco?: string;
  preco_pretendido?: number;
  descricao?: string;
}
