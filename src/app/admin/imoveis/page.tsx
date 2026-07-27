import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getTodosImoveisAdmin } from "@/lib/admin-data";
import { formatarPreco } from "@/lib/format";
import { DeleteImovelButton } from "@/components/admin/delete-imovel-button";

export default async function AdminImoveisPage() {
  await requireAdmin();
  const imoveis = await getTodosImoveisAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ln-ink">Imóveis</h1>
        <Link
          href="/admin/imoveis/novo"
          className="rounded-md bg-ln-gold px-5 py-2.5 text-sm font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white"
        >
          + Novo imóvel
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-black/5 bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Cidade/Bairro</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Destaque</th>
              <th className="px-4 py-3">Fotos</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {imoveis.map((imovel) => (
              <tr key={imovel.id} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ln-ink">{imovel.titulo}</td>
                <td className="px-4 py-3 capitalize text-neutral-600">{imovel.tipo}</td>
                <td className="px-4 py-3 text-neutral-600">
                  {imovel.cidade} / {imovel.bairro}
                </td>
                <td className="px-4 py-3 text-neutral-600">{formatarPreco(imovel.preco)}</td>
                <td className="px-4 py-3 capitalize text-neutral-600">{imovel.status}</td>
                <td className="px-4 py-3">{imovel.destaque ? "Sim" : "Não"}</td>
                <td className="px-4 py-3 text-neutral-600">{imovel.fotos.length}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/imoveis/${imovel.id}`}
                      className="text-sm font-medium text-ln-gold-dark hover:underline"
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
                <td colSpan={8} className="px-4 py-10 text-center text-neutral-400">
                  Nenhum imóvel cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
