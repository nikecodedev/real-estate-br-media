"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/imoveis", label: "Imóveis" },
  { href: "/anuncie", label: "Anuncie seu Imóvel" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setAberto(false)}>
          <Image
            src="/logo-horizontal-preto.png"
            alt="Lis Nery Corretora de Imóveis"
            width={180}
            height={46}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => {
            const ativo = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition hover:text-ln-gold-dark ${
                  ativo ? "text-ln-gold-dark" : "text-ln-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={aberto}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-black/10 md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-ln-ink" />
            <span className="block h-0.5 w-5 bg-ln-ink" />
            <span className="block h-0.5 w-5 bg-ln-ink" />
          </div>
        </button>
      </div>

      {aberto && (
        <nav className="flex flex-col border-t border-black/5 bg-white px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setAberto(false)}
              className="py-2.5 text-sm font-medium text-ln-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
