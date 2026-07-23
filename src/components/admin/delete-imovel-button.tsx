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
      <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
        Excluir
      </button>
    </form>
  );
}
