import { Suspense } from "react";
import type { Metadata } from "next";
import { getCidadesDisponiveis, getImoveis } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { PropertyFilters } from "@/components/property-filters";

export const metadata: Metadata = { title: "Imóveis" };

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const busca = typeof params.busca === "string" ? params.busca : undefined;
  const tipo = typeof params.tipo === "string" ? params.tipo : undefined;
  const cidade = typeof params.cidade === "string" ? params.cidade : undefined;
  const precoMin = typeof params.precoMin === "string" ? Number(params.precoMin) : undefined;
  const precoMax = typeof params.precoMax === "string" ? Number(params.precoMax) : undefined;

  const [imoveis, cidades] = await Promise.all([
    getImoveis({ busca, tipo, cidade, precoMin, precoMax }),
    getCidadesDisponiveis(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-ln-ink">Imóveis disponíveis</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Use os filtros para encontrar o imóvel pela rua, bairro, cidade, tipo
        ou faixa de preço.
      </p>

      <div className="mt-6">
        <Suspense>
          <PropertyFilters cidades={cidades} />
        </Suspense>
      </div>

      <p className="mt-6 text-sm text-neutral-500">
        {imoveis.length} {imoveis.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
      </p>

      {imoveis.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {imoveis.map((imovel) => (
            <PropertyCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-black/10 bg-neutral-50 p-10 text-center text-neutral-500">
          Nenhum imóvel encontrado com esses filtros. Tente ajustar a busca.
        </div>
      )}
    </div>
  );
}
