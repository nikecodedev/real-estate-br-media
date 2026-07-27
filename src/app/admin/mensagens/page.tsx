import { requireAdmin } from "@/lib/auth";
import { getMensagensPaginado } from "@/lib/admin-data";
import { marcarMensagemLida } from "@/app/actions/admin-lists";
import { Pagination } from "@/components/pagination";

export default async function AdminMensagensPage({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>;
}) {
  await requireAdmin();
  const { pagina: paginaParam } = await searchParams;
  const pagina = Math.max(1, Number(paginaParam) || 1);
  const { itens: mensagens, totalPaginas } = await getMensagensPaginado(pagina);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ln-ink">Mensagens de contato</h1>

      <div className="mt-6 space-y-4">
        {mensagens.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-5 shadow-sm ${
              m.lida ? "border-black/5 bg-white" : "border-ln-gold bg-ln-gold/5"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-ln-ink">{m.nome}</p>
              <p className="text-xs text-neutral-400">
                {new Date(m.criado_em).toLocaleString("pt-BR")}
              </p>
            </div>
            <p className="mt-1 text-sm text-neutral-500">
              {m.telefone ?? "Sem telefone"} · {m.email ?? "Sem e-mail"}
            </p>
            <p className="mt-3 whitespace-pre-line text-neutral-700">{m.mensagem}</p>

            {!m.lida && (
              <form action={marcarMensagemLida} className="mt-3">
                <input type="hidden" name="id" value={m.id} />
                <button
                  type="submit"
                  className="text-sm font-medium text-ln-gold-dark hover:underline"
                >
                  Marcar como lida
                </button>
              </form>
            )}
          </div>
        ))}

        {mensagens.length === 0 && (
          <p className="rounded-xl border border-dashed border-black/10 bg-white p-10 text-center text-neutral-400">
            Nenhuma mensagem recebida ainda.
          </p>
        )}
      </div>

      <Pagination
        paginaAtual={pagina}
        totalPaginas={totalPaginas}
        criarHref={(p) => (p > 1 ? `/admin/mensagens?pagina=${p}` : "/admin/mensagens")}
      />
    </div>
  );
}
