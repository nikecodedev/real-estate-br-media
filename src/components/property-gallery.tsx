"use client";

import Image from "next/image";
import { useState } from "react";

export function PropertyGallery({ fotos, titulo }: { fotos: string[]; titulo: string }) {
  const [ativo, setAtivo] = useState(0);
  const [tela, setTela] = useState(false);

  if (fotos.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-neutral-100 text-neutral-400">
        Fotos em breve
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setTela(true)}
        className="relative block aspect-video w-full overflow-hidden rounded-xl bg-neutral-100"
      >
        <Image
          src={fotos[ativo]}
          alt={`${titulo} - foto ${ativo + 1}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority
        />
      </button>

      {fotos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {fotos.map((foto, i) => (
            <button
              key={foto + i}
              type="button"
              onClick={() => setAtivo(i)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                i === ativo ? "border-ln-gold" : "border-transparent"
              }`}
            >
              <Image src={foto} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {tela && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setTela(false)}
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute right-5 top-5 text-3xl text-white"
            onClick={() => setTela(false)}
          >
            ×
          </button>
          <div className="relative h-full w-full max-w-4xl">
            <Image
              src={fotos[ativo]}
              alt={`${titulo} - foto ${ativo + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
