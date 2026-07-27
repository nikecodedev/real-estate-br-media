import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { sair } from "@/app/actions/auth";
import { AdminToast } from "@/components/admin/toast";

export const metadata = { title: "Painel administrativo" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Suspense fallback={null}>
        <AdminToast />
      </Suspense>

      {user && (
        <header className="border-b border-black/10 bg-ln-ink text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-6">
              <span className="font-semibold text-ln-gold">Painel Lis Nery</span>
              <nav className="flex gap-4 text-sm">
                <Link href="/admin" className="hover:text-ln-gold">
                  Início
                </Link>
                <Link href="/admin/imoveis" className="hover:text-ln-gold">
                  Imóveis
                </Link>
                <Link href="/admin/mensagens" className="hover:text-ln-gold">
                  Mensagens
                </Link>
                <Link href="/admin/submissoes" className="hover:text-ln-gold">
                  Imóveis recebidos
                </Link>
              </nav>
            </div>
            <form action={sair}>
              <button
                type="submit"
                className="rounded-md border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
              >
                Sair
              </button>
            </form>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
