import Link from "next/link";
import Image from "next/image";
import { formatarTelefoneExibicao, linkWhatsapp } from "@/lib/format";

export function SiteFooter() {
  const ano = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-ln-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/logo-horizontal-branco.png"
            alt="Lis Nery Corretora de Imóveis"
            width={170}
            height={44}
            className="h-9 w-auto object-contain"
          />
          <p className="mt-4 text-sm leading-relaxed">
            Encontre o imóvel ideal para você, com o acompanhamento de uma
            corretora séria e comprometida em cada etapa da negociação.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ln-gold">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/imoveis" className="hover:text-white">Imóveis</Link></li>
            <li><Link href="/anuncie" className="hover:text-white">Anuncie seu Imóvel</Link></li>
            <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
            <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ln-gold">
            Contato
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={linkWhatsapp("Olá! Vi o site e gostaria de mais informações.")} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp: {formatarTelefoneExibicao()}
              </a>
            </li>
            <li>Rua Pio XII, 945 - Seabra, BA</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {ano} Lis Nery Corretora de Imóveis · CRECI-BA 24521 · Todos os direitos reservados
      </div>
    </footer>
  );
}
