import type { Metadata } from "next";
import { PropertySubmissionForm } from "@/components/property-submission-form";

export const metadata: Metadata = { title: "Anuncie seu Imóvel" };

export default function AnunciePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-ln-ink">Anuncie seu imóvel</h1>
      <p className="mt-2 text-neutral-600">
        Tem um imóvel para vender ou alugar? Preencha os dados abaixo que a
        Lis Nery entra em contato para conhecer o imóvel e combinar os
        próximos passos.
      </p>

      <div className="mt-8 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
        <PropertySubmissionForm />
      </div>
    </div>
  );
}
