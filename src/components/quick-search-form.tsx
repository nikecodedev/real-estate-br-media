"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function QuickSearchForm() {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (busca.trim()) params.set("busca", busca.trim());
    if (tipo) params.set("tipo", tipo);
    router.push(`/imoveis${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-2xl flex-col gap-3 rounded-xl bg-white p-3 shadow-lg sm:flex-row"
    >
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Busque por rua, bairro ou cidade"
        className="flex-1 rounded-md border border-black/10 px-4 py-3 text-ln-ink placeholder:text-neutral-400 focus:border-ln-gold focus:outline-none"
      />
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="rounded-md border border-black/10 px-4 py-3 text-ln-ink focus:border-ln-gold focus:outline-none"
      >
        <option value="">Todos os tipos</option>
        <option value="apartamento">Apartamento</option>
        <option value="casa">Casa</option>
        <option value="terreno">Terreno</option>
        <option value="loteamento">Loteamento</option>
        <option value="comercial">Comercial</option>
        <option value="rural">Rural</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-ln-gold px-6 py-3 font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white"
      >
        Buscar
      </button>
    </form>
  );
}
