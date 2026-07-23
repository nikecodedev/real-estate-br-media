"use client";

import { useActionState } from "react";
import { entrar, type EstadoLogin } from "@/app/actions/auth";

const ESTADO_INICIAL: EstadoLogin = {};

export default function AdminLoginPage() {
  const [estado, action, pending] = useActionState(entrar, ESTADO_INICIAL);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center">
      <h1 className="text-center text-2xl font-bold text-ln-ink">Painel Lis Nery</h1>
      <p className="mt-1 text-center text-sm text-neutral-500">
        Acesso restrito à administração do site.
      </p>

      <form action={action} className="mt-8 space-y-4 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          required
          className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
        />

        {estado.erro && <p className="text-sm text-red-600">{estado.erro}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-ln-gold px-5 py-2.5 font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white disabled:opacity-60"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
