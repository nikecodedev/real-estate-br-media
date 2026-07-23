import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getResumoAdmin } from "@/lib/admin-data";

export default async function AdminHomePage() {
  await requireAdmin();
  const resumo = await getResumoAdmin();

  const cartoes = [
    { label: "Imóveis cadastrados", valor: resumo.totalImoveis, href: "/admin/imoveis" },
    { label: "Imóveis disponíveis", valor: resumo.imoveisDisponiveis, href: "/admin/imoveis" },
    { label: "Mensagens não lidas", valor: resumo.mensagensNaoLidas, href: "/admin/mensagens" },
    { label: "Imóveis recebidos (novos)", valor: resumo.submissoesNovas, href: "/admin/submissoes" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ln-ink">Painel administrativo</h1>
      <p className="mt-1 text-sm text-neutral-500">Visão geral do site.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cartoes.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-3xl font-bold text-ln-gold-dark">{c.valor}</p>
            <p className="mt-1 text-sm text-neutral-500">{c.label}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/admin/imoveis/novo"
        className="mt-8 inline-block rounded-md bg-ln-gold px-6 py-3 font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white"
      >
        + Cadastrar novo imóvel
      </Link>
    </div>
  );
}
