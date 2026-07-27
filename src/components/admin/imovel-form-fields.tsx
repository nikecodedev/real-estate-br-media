import Image from "next/image";
import type { Imovel } from "@/lib/types";
import { PhotoUploader } from "@/components/admin/photo-uploader";

const CAMPO =
  "w-full rounded-md border border-black/10 px-3 py-2.5 text-sm focus:border-ln-gold focus:outline-none";
const ROTULO = "mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-500";

export function ImovelFormFields({ imovel }: { imovel?: Imovel }) {
  return (
    <>
      <div className="sm:col-span-2">
        <label className={ROTULO}>Título</label>
        <input name="titulo" defaultValue={imovel?.titulo} required className={CAMPO} />
      </div>

      <div>
        <label className={ROTULO}>Tipo</label>
        <select name="tipo" defaultValue={imovel?.tipo ?? "apartamento"} className={CAMPO}>
          <option value="apartamento">Apartamento</option>
          <option value="casa">Casa</option>
          <option value="terreno">Terreno</option>
          <option value="loteamento">Loteamento</option>
          <option value="comercial">Comercial</option>
          <option value="rural">Rural</option>
        </select>
      </div>

      <div>
        <label className={ROTULO}>Finalidade</label>
        <select name="finalidade" defaultValue={imovel?.finalidade ?? "venda"} className={CAMPO}>
          <option value="venda">Venda</option>
          <option value="aluguel">Aluguel</option>
        </select>
      </div>

      <div>
        <label className={ROTULO}>Status</label>
        <select name="status" defaultValue={imovel?.status ?? "disponivel"} className={CAMPO}>
          <option value="disponivel">Disponível</option>
          <option value="vendido">Vendido</option>
          <option value="alugado">Alugado</option>
        </select>
      </div>

      <div className="flex items-end gap-2 pb-2.5">
        <input
          id="destaque"
          type="checkbox"
          name="destaque"
          defaultChecked={imovel?.destaque}
          className="h-4 w-4"
        />
        <label htmlFor="destaque" className="text-sm text-neutral-600">
          Mostrar na página inicial (destaque)
        </label>
      </div>

      <div>
        <label className={ROTULO}>Preço (R$)</label>
        <input
          name="preco"
          type="number"
          step="0.01"
          defaultValue={imovel?.preco ?? ""}
          placeholder="Deixe em branco para mostrar &quot;Consulte o valor&quot;"
          className={CAMPO}
        />
      </div>

      <div>
        <label className={ROTULO}>Área (m²)</label>
        <input name="area_m2" type="number" step="0.01" defaultValue={imovel?.area_m2 ?? ""} className={CAMPO} />
      </div>

      <div>
        <label className={ROTULO}>Quartos</label>
        <input name="quartos" type="number" defaultValue={imovel?.quartos ?? 0} className={CAMPO} />
      </div>

      <div>
        <label className={ROTULO}>Banheiros</label>
        <input name="banheiros" type="number" defaultValue={imovel?.banheiros ?? 0} className={CAMPO} />
      </div>

      <div>
        <label className={ROTULO}>Vagas</label>
        <input name="vagas" type="number" defaultValue={imovel?.vagas ?? 0} className={CAMPO} />
      </div>

      <div className="sm:col-span-2">
        <label className={ROTULO}>Endereço (rua e número)</label>
        <input name="endereco" defaultValue={imovel?.endereco} required className={CAMPO} />
      </div>

      <div>
        <label className={ROTULO}>Bairro</label>
        <input name="bairro" defaultValue={imovel?.bairro} required className={CAMPO} />
      </div>

      <div>
        <label className={ROTULO}>Cidade</label>
        <input name="cidade" defaultValue={imovel?.cidade ?? "Seabra"} required className={CAMPO} />
      </div>

      <div>
        <label className={ROTULO}>Estado (UF)</label>
        <input name="estado" defaultValue={imovel?.estado ?? "BA"} maxLength={2} className={CAMPO} />
      </div>

      <div className="sm:col-span-2">
        <label className={ROTULO}>Características (separadas por vírgula)</label>
        <input
          name="caracteristicas"
          defaultValue={imovel?.caracteristicas?.join(", ")}
          placeholder="Piscina, Churrasqueira, Portaria 24h"
          className={CAMPO}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={ROTULO}>Descrição</label>
        <textarea name="descricao" defaultValue={imovel?.descricao ?? ""} rows={5} className={CAMPO} />
      </div>

      <div className="sm:col-span-2">
        <label className={ROTULO}>Link do vídeo (YouTube ou Vimeo, não listado)</label>
        <input
          name="video_url"
          defaultValue={imovel?.video_url ?? ""}
          placeholder="https://youtu.be/..."
          className={CAMPO}
        />
      </div>

      {imovel && imovel.fotos.length > 0 && (
        <div className="sm:col-span-2">
          <label className={ROTULO}>Fotos atuais (desmarque para remover)</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {imovel.fotos.map((foto) => (
              <label key={foto} className="relative block overflow-hidden rounded-md border border-black/10">
                <div className="relative aspect-square w-full">
                  <Image src={foto} alt="" fill sizes="200px" className="object-cover" />
                </div>
                <span className="absolute right-1.5 top-1.5 rounded bg-black/60 p-1">
                  <input type="checkbox" name="manter_fotos" value={foto} defaultChecked className="h-4 w-4" />
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="sm:col-span-2">
        <label className={ROTULO}>
          {imovel ? "Adicionar novas fotos" : "Fotos do imóvel"}
        </label>
        <PhotoUploader name="fotos_novas" />
      </div>
    </>
  );
}
