import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getImovelAdmin } from "@/lib/admin-data";
import { atualizarImovel } from "@/app/actions/imoveis";
import { ImovelFormFields } from "@/components/admin/imovel-form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

export default async function EditarImovelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const imovel = await getImovelAdmin(id);

  if (!imovel) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ln-ink">Editar imóvel</h1>

      <form
        action={atualizarImovel}
        encType="multipart/form-data"
        className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-black/5 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <input type="hidden" name="id" value={imovel.id} />
        <ImovelFormFields imovel={imovel} />

        <div className="sm:col-span-2">
          <SubmitButton>Salvar alterações</SubmitButton>
        </div>
      </form>
    </div>
  );
}
