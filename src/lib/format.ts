export function formatarPreco(preco: number): string {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatarArea(areaM2: number | null): string | null {
  if (!areaM2) return null;
  return `${areaM2.toLocaleString("pt-BR")} m²`;
}

const NUMERO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? "5571900000000";

export function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}
