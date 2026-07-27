"use client";

import { excluirImovel } from "@/app/actions/imoveis";

export function DeleteImovelButton({ id, titulo }: { id: string; titulo: string }) {
  return (
    <form
      action={excluirImovel}
      onSubmit={(e) => {
        if (!confirm(`Excluir o imóvel "${titulo}"? Essa ação não pode ser desfeita.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
      >
        Excluir
      </button>
    </form>
  );
}
