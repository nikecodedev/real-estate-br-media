"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "imoveis";

type ArquivoEnviado = { url: string; nome: string };
type Status = "ocioso" | "enviando" | "erro";

// Uploads go straight from the browser to Supabase Storage, then only the
// resulting URLs (tiny strings) are submitted through the Server Action —
// keeps the form POST well under Vercel's request body limit regardless of
// how many full-resolution photos are selected.
export function PhotoUploader({ name }: { name: string }) {
  const [enviados, setEnviados] = useState<ArquivoEnviado[]>([]);
  const [status, setStatus] = useState<Status>("ocioso");
  const [erro, setErro] = useState<string | null>(null);
  const [progresso, setProgresso] = useState<{ atual: number; total: number } | null>(null);

  async function aoSelecionarArquivos(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivos = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (arquivos.length === 0) return;

    setStatus("enviando");
    setErro(null);
    setProgresso({ atual: 0, total: arquivos.length });

    const supabase = createClient();
    const novos: ArquivoEnviado[] = [];

    for (let i = 0; i < arquivos.length; i++) {
      const arquivo = arquivos[i];
      const extensao = arquivo.name.split(".").pop() || "jpg";
      const caminho = `${crypto.randomUUID()}.${extensao}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(caminho, arquivo, { contentType: arquivo.type, upsert: false });

      if (error) {
        setErro(`Falha ao enviar "${arquivo.name}": ${error.message}`);
        setStatus("erro");
        setProgresso(null);
        return;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(caminho);
      novos.push({ url: data.publicUrl, nome: arquivo.name });
      setProgresso({ atual: i + 1, total: arquivos.length });
    }

    setEnviados((prev) => [...prev, ...novos]);
    setStatus("ocioso");
    setProgresso(null);
  }

  function remover(url: string) {
    setEnviados((prev) => prev.filter((f) => f.url !== url));
  }

  return (
    <div>
      <label className="block cursor-pointer rounded-md border border-dashed border-black/20 bg-neutral-50 px-3 py-3 text-sm text-neutral-600">
        <span className="mr-4 inline-block rounded-md bg-ln-gold px-4 py-2 text-sm font-semibold text-white transition hover:bg-ln-gold-dark">
          Escolher fotos
        </span>
        {status === "enviando"
          ? `Enviando ${progresso?.atual ?? 0} de ${progresso?.total ?? 0}...`
          : enviados.length > 0
            ? `${enviados.length} foto(s) pronta(s)`
            : "Nenhum arquivo escolhido"}
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={status === "enviando"}
          onChange={aoSelecionarArquivos}
          className="hidden"
        />
      </label>

      {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}

      {enviados.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {enviados.map((f) => (
            <div key={f.url} className="relative overflow-hidden rounded-md border border-black/10">
              <div className="relative aspect-square w-full">
                <Image src={f.url} alt={f.nome} fill sizes="200px" className="object-cover" />
              </div>
              <button
                type="button"
                onClick={() => remover(f.url)}
                className="absolute right-1.5 top-1.5 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white"
              >
                Remover
              </button>
              <input type="hidden" name={name} value={f.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
