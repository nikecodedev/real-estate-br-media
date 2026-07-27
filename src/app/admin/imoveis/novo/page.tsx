import { requireAdmin } from "@/lib/auth";
import { criarImovel } from "@/app/actions/imoveis";
import { ImovelFormFields } from "@/components/admin/imovel-form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

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
          <SubmitButton>Cadastrar imóvel</SubmitButton>
        </div>
      </form>
    </div>
  );
}
