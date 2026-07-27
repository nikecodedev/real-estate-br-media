import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { getResumoAdmin, getImoveisAdminPaginado } from "@/lib/admin-data";
import { formatarPreco } from "@/lib/format";
import { AnimatedCounter } from "@/components/admin/animated-counter";
import { DeleteImovelButton } from "@/components/admin/delete-imovel-button";
import { Pagination } from "@/components/pagination";
import type { StatusImovel } from "@/lib/types";

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

const ROTULO_TIPO: Record<string, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
  loteamento: "Loteamento",
  comercial: "Comercial",
  rural: "Rural",
};

const STATUS_ESTILO: Record<StatusImovel, string> = {
  disponivel: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
  vendido: "bg-neutral-100 text-neutral-600 ring-1 ring-inset ring-neutral-400/20",
  alugado: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
};

const STATUS_ROTULO: Record<StatusImovel, string> = {
  disponivel: "Disponível",
  vendido: "Vendido",
  alugado: "Alugado",
};

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>;
}) {
  await requireAdmin();
  const { pagina: paginaParam } = await searchParams;
  const pagina = Math.max(1, Number(paginaParam) || 1);

  const [resumo, { itens: imoveis, totalPaginas }] = await Promise.all([
    getResumoAdmin(),
    getImoveisAdminPaginado(pagina),
  ]);

  const cartoes = [
    {
      label: "Imóveis cadastrados",
      valor: resumo.totalImoveis,
      icone: <IconeCasa />,
      cor: CORES.gold,
    },
    {
      label: "Imóveis disponíveis",
      valor: resumo.imoveisDisponiveis,
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
        {cartoes.map((c, i) => {
          const Conteudo = (
            <>
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
            </>
          );

          const className =
            "animate-toast-in group relative overflow-hidden rounded-xl border border-black/5 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg";

          return c.href ? (
            <Link
              key={c.label}
              href={c.href}
              className={className}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {Conteudo}
            </Link>
          ) : (
            <div key={c.label} className={className} style={{ animationDelay: `${i * 70}ms` }}>
              {Conteudo}
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-ln-ink">Imóveis</h2>
        <Link
          href="/admin/imoveis/novo"
          className="inline-flex items-center gap-2 rounded-md bg-ln-gold px-5 py-2.5 text-sm font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Cadastrar novo imóvel
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-black/5 bg-neutral-50 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-3">Imóvel</th>
                <th className="px-4 py-3">Cidade/Bairro</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Destaque</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {imoveis.map((imovel, i) => (
                <tr
                  key={imovel.id}
                  className="animate-row-fade-in border-b border-black/5 transition-colors last:border-0 hover:bg-neutral-50/80"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        {imovel.fotos[0] ? (
                          <Image
                            src={imovel.fotos[0]}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">
                            Sem foto
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ln-ink">{imovel.titulo}</p>
                        <p className="text-xs text-neutral-500">
                          {ROTULO_TIPO[imovel.tipo] ?? imovel.tipo} · {imovel.fotos.length}{" "}
                          {imovel.fotos.length === 1 ? "foto" : "fotos"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {imovel.cidade} / {imovel.bairro}
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-700">
                    {formatarPreco(imovel.preco)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_ESTILO[imovel.status]}`}
                    >
                      {STATUS_ROTULO[imovel.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {imovel.destaque ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-ln-gold/15 px-2.5 py-1 text-xs font-medium text-ln-gold-dark">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
                        </svg>
                        Destaque
                      </span>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/imoveis/${imovel.id}`}
                        className="rounded-md border border-ln-gold/40 px-2.5 py-1 text-xs font-semibold text-ln-gold-dark transition hover:bg-ln-gold/10"
                      >
                        Editar
                      </Link>
                      <DeleteImovelButton id={imovel.id} titulo={imovel.titulo} />
                    </div>
                  </td>
                </tr>
              ))}

              {imoveis.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-neutral-400">
                    Nenhum imóvel cadastrado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        paginaAtual={pagina}
        totalPaginas={totalPaginas}
        criarHref={(p) => (p > 1 ? `/admin?pagina=${p}` : "/admin")}
      />
    </div>
  );
}
