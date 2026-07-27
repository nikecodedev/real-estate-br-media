"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function PropertyFilters({ cidades }: { cidades: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [busca, setBusca] = useState(searchParams.get("busca") ?? "");
  const [tipo, setTipo] = useState(searchParams.get("tipo") ?? "");
  const [finalidade, setFinalidade] = useState(searchParams.get("finalidade") ?? "");
  const [cidade, setCidade] = useState(searchParams.get("cidade") ?? "");
  const [precoMin, setPrecoMin] = useState(searchParams.get("precoMin") ?? "");
  const [precoMax, setPrecoMax] = useState(searchParams.get("precoMax") ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (busca.trim()) params.set("busca", busca.trim());
    if (tipo) params.set("tipo", tipo);
    if (finalidade) params.set("finalidade", finalidade);
    if (cidade) params.set("cidade", cidade);
    if (precoMin) params.set("precoMin", precoMin);
    if (precoMax) params.set("precoMax", precoMax);
    router.push(`/imoveis${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function limpar() {
    setBusca("");
    setTipo("");
    setFinalidade("");
    setCidade("");
    setPrecoMin("");
    setPrecoMax("");
    router.push("/imoveis");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-7"
    >
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Rua, bairro ou cidade"
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none lg:col-span-2"
      />

      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      >
        <option value="">Tipo</option>
        <option value="apartamento">Apartamento</option>
        <option value="casa">Casa</option>
        <option value="terreno">Terreno</option>
        <option value="loteamento">Loteamento</option>
        <option value="comercial">Comercial</option>
        <option value="rural">Rural</option>
      </select>

      <select
        value={finalidade}
        onChange={(e) => setFinalidade(e.target.value)}
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      >
        <option value="">Venda ou aluguel</option>
        <option value="venda">Venda</option>
        <option value="aluguel">Aluguel</option>
      </select>

      <select
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      >
        <option value="">Cidade</option>
        {cidades.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={precoMin}
        onChange={(e) => setPrecoMin(e.target.value)}
        placeholder="Preço mín."
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />

      <input
        type="number"
        value={precoMax}
        onChange={(e) => setPrecoMax(e.target.value)}
        placeholder="Preço máx."
        className="rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none"
      />

      <div className="flex gap-2 sm:col-span-2 lg:col-span-7">
        <button
          type="submit"
          className="rounded-md bg-ln-gold px-5 py-2.5 text-sm font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={limpar}
          className="rounded-md border border-black/10 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
