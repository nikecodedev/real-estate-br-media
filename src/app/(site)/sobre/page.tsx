import type { Metadata } from "next";
import Image from "next/image";
import { WhatsappButton } from "@/components/whatsapp-button";

export const metadata: Metadata = { title: "Sobre" };

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <Image
          src="/logo-badge.png"
          alt="Lis Nery Corretora de Imóveis - CRECI-BA 24521"
          width={160}
          height={160}
          className="h-36 w-36 object-contain"
        />
        <h1 className="text-3xl font-bold text-ln-ink">Sobre a Lis Nery</h1>
        <p className="text-sm font-semibold uppercase tracking-wide text-ln-gold-dark">
          CRECI-BA 24521
        </p>
      </div>

      <div className="mt-10 space-y-5 leading-relaxed text-neutral-700">
        <p>
          A Lis Nery é corretora de imóveis registrada (CRECI-BA 24521) e
          atua conectando quem procura o imóvel ideal a quem deseja vender ou
          alugar com segurança e transparência.
        </p>
        <p>
          Com atendimento próximo e atenção a cada detalhe da negociação, o
          compromisso é simples: entender exatamente o que o cliente precisa
          e apresentar as melhores opções disponíveis, sem enrolação.
        </p>
        <p>
          Cada imóvel do nosso acervo é selecionado e apresentado com
          informações completas, fotos e vídeos reais, para que a decisão do
          cliente seja sempre bem informada.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <WhatsappButton mensagem="Olá! Vi a página Sobre e gostaria de falar com a Lis Nery.">
          Falar com a Lis Nery
        </WhatsappButton>
      </div>
    </div>
  );
}
