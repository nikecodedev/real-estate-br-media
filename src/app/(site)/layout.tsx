import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFloatingButton } from "@/components/whatsapp-button";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsappFloatingButton />
    </>
  );
}
