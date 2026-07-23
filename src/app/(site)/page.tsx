import Link from "next/link";
import { getDestaques } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { QuickSearchForm } from "@/components/quick-search-form";

export default async function HomePage() {
  const destaques = await getDestaques();

  return (
    <>
      <section className="relative overflow-hidden bg-ln-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 md:py-28">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-ln-gold/15 px-4 py-1 text-sm font-semibold text-ln-gold">
              Lis Nery · CRECI-BA 24521
            </span>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              O imóvel certo, com a corretora certa ao seu lado.
            </h1>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              Apartamentos, casas e imóveis comerciais selecionados, com
              atendimento próximo do início ao fim da negociação.
            </p>
          </div>

          <QuickSearchForm />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ln-ink">Imóveis em destaque</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Uma seleção dos melhores imóveis disponíveis agora.
            </p>
          </div>
          <Link
            href="/imoveis"
            className="hidden text-sm font-semibold text-ln-gold-dark hover:underline sm:inline"
          >
            Ver todos os imóveis →
          </Link>
        </div>

        {destaques.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((imovel) => (
              <PropertyCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-black/10 bg-neutral-50 p-10 text-center text-neutral-500">
            Nenhum imóvel em destaque no momento. Novos imóveis aparecem aqui
            assim que forem cadastrados no painel administrativo.
          </div>
        )}

        <Link
          href="/imoveis"
          className="mt-8 block text-center text-sm font-semibold text-ln-gold-dark hover:underline sm:hidden"
        >
          Ver todos os imóveis →
        </Link>
      </section>

      <section className="bg-ln-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ln-ink">
              Quer anunciar o seu imóvel?
            </h2>
            <p className="mt-3 text-neutral-600">
              Se você tem um imóvel para vender ou alugar, conte com a Lis
              Nery para encontrar o comprador ou inquilino ideal.
            </p>
            <Link
              href="/anuncie"
              className="mt-6 inline-block rounded-md bg-ln-gold px-6 py-3 font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white"
            >
              Anunciar meu imóvel
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ln-ink">
              Prefere falar diretamente?
            </h2>
            <p className="mt-3 text-neutral-600">
              Fale agora mesmo pelo WhatsApp e tire suas dúvidas sobre
              qualquer imóvel do nosso acervo.
            </p>
            <Link
              href="/contato"
              className="mt-6 inline-block rounded-md border-2 border-ln-ink px-6 py-3 font-semibold text-ln-ink transition hover:bg-ln-ink hover:text-white"
            >
              Ir para contato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
