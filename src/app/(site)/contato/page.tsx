import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { WhatsappButton } from "@/components/whatsapp-button";

export const metadata: Metadata = { title: "Contato" };

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-ln-ink">Fale com a Lis Nery</h1>
      <p className="mt-2 text-neutral-600">
        Tire suas dúvidas sobre qualquer imóvel do acervo, ou envie sua
        mensagem que retornamos o mais rápido possível.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-ln-ink">
            Envie uma mensagem
          </h2>
          <ContactForm />
        </div>

        <div className="flex flex-col justify-between rounded-xl bg-ln-ink p-6 text-white">
          <div>
            <h2 className="text-lg font-semibold text-ln-gold">
              Prefere o WhatsApp?
            </h2>
            <p className="mt-2 text-white/80">
              Fala direto com a gente, resposta mais rápida.
            </p>
          </div>
          <WhatsappButton
            mensagem="Olá! Gostaria de falar sobre um imóvel."
            className="mt-6"
          >
            Abrir WhatsApp
          </WhatsappButton>
        </div>
      </div>
    </div>
  );
}
