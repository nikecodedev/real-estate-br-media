"use client";

import { useActionState } from "react";
import { enviarSubmissaoImovel, type EstadoFormulario } from "@/app/actions/public";

const ESTADO_INICIAL: EstadoFormulario = { ok: false };

export function PropertySubmissionForm() {
  const [estado, action, pending] = useActionState(enviarSubmissaoImovel, ESTADO_INICIAL);

  if (estado.ok) {
    return (
      <p className="rounded-md bg-green-50 p-5 text-green-700">
        Recebemos os dados do seu imóvel! A Lis Nery vai analisar e entrar em
        contato em breve.
      </p>
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
