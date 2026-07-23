import Image from "next/image";
import Link from "next/link";
import type { Imovel } from "@/lib/types";
import { formatarArea, formatarPreco } from "@/lib/format";

const ROTULO_TIPO: Record<string, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
  comercial: "Comercial",
  rural: "Rural",
};

export function PropertyCard({ imovel }: { imovel: Imovel }) {
  const capa = imovel.fotos?.[0];
  const area = formatarArea(imovel.area_m2);

  return (
    <Link
      href={`/imoveis/${imovel.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        {capa ? (
          <Image
            src={capa}
            alt={imovel.titulo}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            Sem foto
          </div>
        )}

        {imovel.status !== "disponivel" && (
          <span className="absolute left-3 top-3 rounded-full bg-ln-ink/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {imovel.status === "vendido" ? "Vendido" : "Alugado"}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ln-ink">
          {ROTULO_TIPO[imovel.tipo] ?? imovel.tipo}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-ln-ink">{imovel.titulo}</h3>
        <p className="line-clamp-1 text-sm text-neutral-500">
          {imovel.bairro}, {imovel.cidade} - {imovel.estado}
        </p>

        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-neutral-600">
          {area && <span>{area}</span>}
          {imovel.quartos > 0 && <span>{imovel.quartos} quartos</span>}
          {imovel.banheiros > 0 && <span>{imovel.banheiros} banheiros</span>}
          {imovel.vagas > 0 && <span>{imovel.vagas} vagas</span>}
        </div>

        <p className="mt-auto pt-2 text-lg font-bold text-ln-gold-dark">
          {formatarPreco(imovel.preco)}
          {imovel.finalidade === "aluguel" && (
            <span className="text-sm font-normal text-neutral-500">/mês</span>
          )}
        </p>
      </div>
    </Link>
  );
}
