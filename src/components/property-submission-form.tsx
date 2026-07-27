"use client";

import { useActionState } from "react";
import { enviarSubmissaoImovel, type EstadoFormulario } from "@/app/actions/public";

const ESTADO_INICIAL: EstadoFormulario = { ok: false };

export function PropertySubmissionForm() {
  const [estado, action, pending] = useActionState(enviarSubmissaoImovel, ESTADO_INICIAL);

  if (estado.ok) {
    return (
      <div className="animate-toast-in flex items-start gap-3 rounded-md bg-green-50 p-5 text-green-700">
        <span
          className="animate-ring-pulse flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
          style={{ ["--pulse-color" as string]: "#22c55e" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-4 w-4">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="pt-1">
          Recebemos os dados do seu imóvel! A Lis Nery vai analisar e entrar em
          contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input
        name="nome"
        placeholder="Seu nome"
        required
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />
      <input
        name="telefone"
        placeholder="Telefone / WhatsApp"
        required
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />
      <input
        name="email"
        type="email"
        placeholder="E-mail (opcional)"
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />
      <select
        name="tipo"
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      >
        <option value="">Tipo do imóvel</option>
        <option value="apartamento">Apartamento</option>
        <option value="casa">Casa</option>
        <option value="terreno">Terreno</option>
        <option value="comercial">Comercial</option>
        <option value="rural">Rural</option>
      </select>
      <input
        name="endereco"
        placeholder="Endereço do imóvel"
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none sm:col-span-2"
      />
      <input
        name="preco_pretendido"
        type="number"
        placeholder="Preço pretendido (opcional)"
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none sm:col-span-2"
      />
      <textarea
        name="descricao"
        placeholder="Conte um pouco sobre o imóvel"
        rows={4}
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none sm:col-span-2"
      />

      {estado.erro && <p className="text-sm text-red-600 sm:col-span-2">{estado.erro}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-ln-gold px-6 py-3 font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white disabled:opacity-60 sm:col-span-2"
      >
        {pending ? "Enviando..." : "Enviar meu imóvel"}
      </button>
    </form>
  );
}
