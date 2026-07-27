"use client";

import { useActionState } from "react";
import { enviarMensagemContato, type EstadoFormulario } from "@/app/actions/public";

const ESTADO_INICIAL: EstadoFormulario = { ok: false };

export function ContactForm({ imovelId }: { imovelId?: string }) {
  const [estado, action, pending] = useActionState(enviarMensagemContato, ESTADO_INICIAL);

  if (estado.ok) {
    return (
      <div className="animate-toast-in flex items-start gap-3 rounded-md bg-green-50 p-4 text-sm text-green-700">
        <span
          className="animate-ring-pulse flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
          style={{ ["--pulse-color" as string]: "#22c55e" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3.5 w-3.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="pt-0.5">Mensagem enviada! A Lis Nery vai entrar em contato em breve.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3">
      {imovelId && <input type="hidden" name="imovel_id" value={imovelId} />}

      <input
        name="nome"
        placeholder="Seu nome"
        required
        className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />
      <input
        name="telefone"
        placeholder="Telefone / WhatsApp"
        className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />
      <input
        name="email"
        type="email"
        placeholder="E-mail (opcional)"
        className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />
      <textarea
        name="mensagem"
        placeholder="Escreva sua mensagem"
        required
        rows={4}
        className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />

      {estado.erro && <p className="text-sm text-red-600">{estado.erro}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-ln-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
