import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { getTodosImoveisAdmin } from "@/lib/admin-data";
import { formatarPreco } from "@/lib/format";
import { DeleteImovelButton } from "@/components/admin/delete-imovel-button";
import type { StatusImovel } from "@/lib/types";

const ROTULO_TIPO: Record<string, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
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
    </div>
  );
}
