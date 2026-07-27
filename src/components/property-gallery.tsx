"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function IconeChevron({ direcao }: { direcao: "esquerda" | "direita" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
      <path
        d={direcao === "esquerda" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BotaoSeta({
  direcao,
  onClick,
  className = "",
}: {
  direcao: "esquerda" | "direita";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={direcao === "esquerda" ? "Foto anterior" : "Próxima foto"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition duration-200 hover:scale-110 hover:bg-black/60 ${className}`}
    >
      <IconeChevron direcao={direcao} />
    </button>
  );
}

export function PropertyGallery({ fotos, titulo }: { fotos: string[]; titulo: string }) {
  const [ativo, setAtivo] = useState(0);
  const [tela, setTela] = useState(false);

  const total = fotos.length;
  const anterior = () => setAtivo((i) => (i - 1 + total) % total);
  const proxima = () => setAtivo((i) => (i + 1) % total);

  useEffect(() => {
    if (!tela) return;
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proxima();
      if (e.key === "Escape") setTela(false);
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tela, total]);

  if (total === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-neutral-100 text-neutral-400">
        Fotos em breve
      </div>
    );
  }

  return (
    <div>
      <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
        <button
          type="button"
          onClick={() => setTela(true)}
          className="absolute inset-0 z-0 block h-full w-full"
        >
          <Image
            key={ativo}
            src={fotos[ativo]}
            alt={`${titulo} - foto ${ativo + 1}`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="animate-image-fade object-cover"
            priority
          />
        </button>

        {total > 1 && (
          <>
            <BotaoSeta
              direcao="esquerda"
              onClick={anterior}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <BotaoSeta
              direcao="direita"
              onClick={proxima}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {ativo + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {fotos.map((foto, i) => (
            <button
              key={foto + i}
              type="button"
              onClick={() => setAtivo(i)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 ${
                i === ativo
                  ? "border-ln-gold opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
              }`}
            >
              <Image src={foto} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {tela && (
        <div
          className="animate-toast-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setTela(false)}
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
            onClick={() => setTela(false)}
          >
            ×
          </button>

          <div className="relative h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              key={ativo}
              src={fotos[ativo]}
              alt={`${titulo} - foto ${ativo + 1}`}
              fill
              sizes="100vw"
              className="animate-image-fade object-contain"
            />

            {total > 1 && (
              <>
                <BotaoSeta
                  direcao="esquerda"
                  onClick={anterior}
                  className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-4"
                />
                <BotaoSeta
                  direcao="direita"
                  onClick={proxima}
                  className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-4"
                />
                <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {ativo + 1} / {total}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
