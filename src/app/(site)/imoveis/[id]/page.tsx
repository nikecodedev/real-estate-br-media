import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getImovel } from "@/lib/data";
import { formatarArea, formatarPreco } from "@/lib/format";
import { getEmbedUrl } from "@/lib/video";
import { PropertyGallery } from "@/components/property-gallery";
import { WhatsappButton } from "@/components/whatsapp-button";
import { ContactForm } from "@/components/contact-form";

const ROTULO_TIPO: Record<string, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
  comercial: "Comercial",
  rural: "Rural",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const imovel = await getImovel(id);
  return { title: imovel ? imovel.titulo : "Imóvel" };
}

export default async function ImovelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const imovel = await getImovel(id);

  if (!imovel) notFound();

  const embed = imovel.video_url ? getEmbedUrl(imovel.video_url) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-sm text-neutral-500">
        <a href="/imoveis" className="hover:underline">
          Imóveis
        </a>{" "}
        / {ROTULO_TIPO[imovel.tipo] ?? imovel.tipo}
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyGallery fotos={imovel.fotos} titulo={imovel.titulo} />

          {embed && (
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={embed}
                title={`Vídeo - ${imovel.titulo}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}

          <h1 className="mt-8 text-2xl font-bold text-ln-ink sm:text-3xl">
            {imovel.titulo}
          </h1>
          <p className="mt-1 text-neutral-500">
            {imovel.endereco}, {imovel.bairro} · {imovel.cidade} - {imovel.estado}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-black/5 bg-neutral-50 p-5 sm:grid-cols-4">
            <Info label="Tipo" valor={ROTULO_TIPO[imovel.tipo] ?? imovel.tipo} />
            {formatarArea(imovel.area_m2) && (
              <Info label="Área" valor={formatarArea(imovel.area_m2)!} />
            )}
            <Info label="Quartos" valor={String(imovel.quartos)} />
            <Info label="Banheiros" valor={String(imovel.banheiros)} />
            <Info label="Vagas" valor={String(imovel.vagas)} />
            <Info
              label="Finalidade"
              valor={imovel.finalidade === "venda" ? "Venda" : "Aluguel"}
            />
          </div>

          {imovel.descricao && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-ln-ink">Descrição</h2>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-neutral-700">
                {imovel.descricao}
              </p>
            </div>
          )}

          {imovel.caracteristicas.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-ln-ink">Características</h2>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-neutral-700 sm:grid-cols-3">
                {imovel.caracteristicas.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-ln-gold" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-black/5 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <p className="text-3xl font-bold text-ln-gold-dark">
            {formatarPreco(imovel.preco)}
            {imovel.finalidade === "aluguel" && (
              <span className="text-base font-normal text-neutral-500">/mês</span>
            )}
          </p>

          <WhatsappButton
            mensagem={`Olá! Tenho interesse no imóvel "${imovel.titulo}" (${imovel.bairro}, ${imovel.cidade}).`}
            className="mt-5 w-full"
          >
            Falar no WhatsApp
          </WhatsappButton>

          <div className="mt-6 border-t border-black/5 pt-6">
            <h3 className="mb-3 text-sm font-semibold text-ln-ink">
              Ou envie uma mensagem
            </h3>
            <ContactForm imovelId={imovel.id} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Info({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="font-semibold text-ln-ink">{valor}</p>
    </div>
  );
}
