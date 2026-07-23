import { requireAdmin } from "@/lib/auth";
import { criarImovel } from "@/app/actions/imoveis";
import { ImovelFormFields } from "@/components/admin/imovel-form-fields";

export default async function NovoImovelPage() {
  await requireAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ln-ink">Novo imóvel</h1>

      <form
        action={criarImovel}
        encType="multipart/form-data"
        className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-black/5 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <ImovelFormFields />

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-ln-gold px-6 py-3 font-semibold text-ln-ink transition hover:bg-ln-gold-dark hover:text-white"
          >
            Cadastrar imóvel
          </button>
        </div>
      </form>
    </div>
  );
}
