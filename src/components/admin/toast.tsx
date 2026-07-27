"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const MENSAGENS_SUCESSO: Record<string, string> = {
  criado: "Imóvel criado com sucesso.",
  atualizado: "Alterações salvas com sucesso.",
  excluido: "Imóvel excluído.",
};

const DURACAO_MS = 5000;

export function AdminToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codigo = searchParams.get("sucesso");
  const mensagem = codigo ? MENSAGENS_SUCESSO[codigo] : undefined;

  const [visivel, setVisivel] = useState(false);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    if (!mensagem) return;

    setSaindo(false);
    setVisivel(true);

    const limparUrl = () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("sucesso");
      router.replace(url.pathname + url.search, { scroll: false });
    };

    const iniciarSaida = setTimeout(() => setSaindo(true), DURACAO_MS);
    const remover = setTimeout(() => {
      setVisivel(false);
      limparUrl();
    }, DURACAO_MS + 250);

    return () => {
      clearTimeout(iniciarSaida);
      clearTimeout(remover);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigo]);

  function fechar() {
    setSaindo(true);
    setTimeout(() => {
      setVisivel(false);
      const url = new URL(window.location.href);
      url.searchParams.delete("sucesso");
      router.replace(url.pathname + url.search, { scroll: false });
    }, 250);
  }

  if (!visivel || !mensagem) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4 sm:justify-end sm:pr-6">
      <div
        role="status"
        className={`pointer-events-auto relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-xl bg-ln-ink p-4 text-white shadow-2xl ring-1 ring-white/10 ${
          saindo ? "animate-toast-out" : "animate-toast-in"
        }`}
      >
        <span
          className="animate-ring-pulse flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
          style={{ ["--pulse-color" as string]: "#22c55e" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-4 w-4">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <p className="flex-1 pt-1 text-sm font-medium leading-snug">{mensagem}</p>

        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="shrink-0 rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <div
            className="animate-progress-shrink h-full bg-ln-gold"
            style={{ animationDuration: `${DURACAO_MS}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
