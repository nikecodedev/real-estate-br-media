import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getResumoAdmin } from "@/lib/admin-data";
import { AnimatedCounter } from "@/components/admin/animated-counter";

function IconeCasa() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconeCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.3 2.3L15.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconeMensagem() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path
        d="M4 5.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-4.5 3.5V6.5a1 1 0 0 1 1-1z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconeCaixaEntrada() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path
        d="M3 12h5l1.5 3h5L16 12h5M4 12l1.6-6.4A1 1 0 0 1 6.56 5h10.88a1 1 0 0 1 .96.76L20 12v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CORES = {
  gold: { badge: "bg-ln-gold/15 text-ln-gold-dark", barra: "bg-ln-gold" },
  green: { badge: "bg-green-50 text-green-600", barra: "bg-green-500" },
  blue: { badge: "bg-blue-50 text-blue-600", barra: "bg-blue-500" },
  purple: { badge: "bg-purple-50 text-purple-600", barra: "bg-purple-500" },
} as const;

export default async function AdminHomePage() {
  await requireAdmin();
  const resumo = await getResumoAdmin();

  const cartoes = [
    {
      label: "Imóveis cadastrados",
      valor: resumo.totalImoveis,
      href: "/admin/imoveis",
      icone: <IconeCasa />,
      cor: CORES.gold,
    },
    {
      label: "Imóveis disponíveis",
      valor: resumo.imoveisDisponiveis,
      href: "/admin/imoveis",
      icone: <IconeCheck />,
      cor: CORES.green,
    },
    {
      label: "Mensagens não lidas",
      valor: resumo.mensagensNaoLidas,
      href: "/admin/mensagens",
      icone: <IconeMensagem />,
      cor: CORES.blue,
      atencao: resumo.mensagensNaoLidas > 0,
    },
    {
      label: "Imóveis recebidos (novos)",
      valor: resumo.submissoesNovas,
      href: "/admin/submissoes",
      icone: <IconeCaixaEntrada />,
      cor: CORES.purple,
      atencao: resumo.submissoesNovas > 0,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ln-ink">Painel administrativo</h1>
      <p className="mt-1 text-sm text-neutral-500">Visão geral do site.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cartoes.map((c, i) => (
          <Link
            key={c.label}
            href={c.href}
            className="animate-toast-in group relative overflow-hidden rounded-xl border border-black/5 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className={`absolute inset-y-0 left-0 w-1 ${c.cor.barra}`} />

            <div className="flex items-start justify-between">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${c.cor.badge}`}>
                {c.icone}
              </span>
              {c.atencao && (
                <span
                  className="animate-ring-pulse h-2.5 w-2.5 rounded-full bg-red-500"
                  style={{ ["--pulse-color" as string]: "#ef4444" }}
                />
              )}
            </div>

            <p className="mt-4 text-3xl font-bold text-ln-ink transition-colors group-hover:text-ln-gold-dark">
              <AnimatedCounter valor={c.valor} />
            </p>
            <p className="mt-1 text-sm text-neutral-500">{c.label}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/admin/imoveis/novo"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-ln-gold px-6 py-3 font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
        Cadastrar novo imóvel
      </Link>
    </div>
  );
}
