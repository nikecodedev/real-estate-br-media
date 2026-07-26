export function formatarPreco(preco: number | null): string {
  if (preco === null) return "Consulte o valor";
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

export const NUMERO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? "5571900000000";

export function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

export function formatarTelefoneExibicao(numero: string = NUMERO_WHATSAPP): string {
  const digitos = numero.replace(/\D/g, "");
  const semPais = digitos.startsWith("55") ? digitos.slice(2) : digitos;
  const ddd = semPais.slice(0, 2);
  const resto = semPais.slice(2);

  if (resto.length === 9) return `(${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`;
  if (resto.length === 8) return `(${ddd}) ${resto.slice(0, 4)}-${resto.slice(4)}`;
  return numero;
}
