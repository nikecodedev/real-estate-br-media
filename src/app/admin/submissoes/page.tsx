import { requireAdmin } from "@/lib/auth";
import { getSubmissoesPaginado } from "@/lib/admin-data";
import { formatarPreco } from "@/lib/format";
import { atualizarStatusSubmissao } from "@/app/actions/admin-lists";
import { Pagination } from "@/components/pagination";

const ROTULO_STATUS: Record<string, string> = {
  novo: "Novo",
  em_analise: "Em análise",
  publicado: "Publicado",
  recusado: "Recusado",
};

export default async function AdminSubmissoesPage({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>;
}) {
  await requireAdmin();
  const { pagina: paginaParam } = await searchParams;
  const pagina = Math.max(1, Number(paginaParam) || 1);
  const { itens: submissoes, totalPaginas } = await getSubmissoesPaginado(pagina);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ln-ink">Imóveis recebidos</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Imóveis enviados por interessados na página "Anuncie seu Imóvel".
      </p>

      <div className="mt-6 space-y-4">
        {submissoes.map((s) => (
          <div key={s.id} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-ln-ink">{s.nome}</p>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                {ROTULO_STATUS[s.status] ?? s.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-neutral-500">
              {s.telefone} · {s.email ?? "Sem e-mail"}
            </p>
            {s.tipo && <p className="mt-2 text-sm text-neutral-600">Tipo: {s.tipo}</p>}
            {s.endereco && <p className="text-sm text-neutral-600">Endereço: {s.endereco}</p>}
            {s.preco_pretendido && (
              <p className="text-sm text-neutral-600">
                Preço pretendido: {formatarPreco(s.preco_pretendido)}
              </p>
            )}
            {s.descricao && <p className="mt-2 whitespace-pre-line text-neutral-700">{s.descricao}</p>}

            <form action={atualizarStatusSubmissao} className="mt-4 flex items-center gap-2">
              <input type="hidden" name="id" value={s.id} />
              <select
                name="status"
                defaultValue={s.status}
                className="rounded-md border border-black/10 px-3 py-2 text-sm"
              >
                <option value="novo">Novo</option>
                <option value="em_analise">Em análise</option>
                <option value="publicado">Publicado</option>
                <option value="recusado">Recusado</option>
              </select>
              <button
                type="submit"
                className="rounded-md bg-ln-ink px-4 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                Atualizar status
              </button>
            </form>
          </div>
        ))}

        {submissoes.length === 0 && (
          <p className="rounded-xl border border-dashed border-black/10 bg-white p-10 text-center text-neutral-400">
            Nenhum imóvel recebido ainda.
          </p>
        )}
      </div>

      <Pagination
        paginaAtual={pagina}
        totalPaginas={totalPaginas}
        criarHref={(p) => (p > 1 ? `/admin/submissoes?pagina=${p}` : "/admin/submissoes")}
      />
    </div>
  );
}
