import Link from "next/link";

export function Pagination({
  paginaAtual,
  totalPaginas,
  criarHref,
}: {
  paginaAtual: number;
  totalPaginas: number;
  criarHref: (pagina: number) => string;
}) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginação" className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
      <Link
        href={criarHref(Math.max(1, paginaAtual - 1))}
        aria-disabled={paginaAtual === 1}
        tabIndex={paginaAtual === 1 ? -1 : undefined}
        className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
          paginaAtual === 1
            ? "pointer-events-none border-black/5 text-neutral-300"
            : "border-black/10 text-neutral-600 hover:border-ln-gold hover:text-ln-gold-dark"
        }`}
      >
        Anterior
      </Link>

      {paginas.map((p) => (
        <Link
          key={p}
          href={criarHref(p)}
          aria-current={p === paginaAtual ? "page" : undefined}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
            p === paginaAtual
              ? "bg-ln-gold text-ln-ink"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={criarHref(Math.min(totalPaginas, paginaAtual + 1))}
        aria-disabled={paginaAtual === totalPaginas}
        tabIndex={paginaAtual === totalPaginas ? -1 : undefined}
        className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
          paginaAtual === totalPaginas
            ? "pointer-events-none border-black/5 text-neutral-300"
            : "border-black/10 text-neutral-600 hover:border-ln-gold hover:text-ln-gold-dark"
        }`}
      >
        Próxima
      </Link>
    </nav>
  );
}
