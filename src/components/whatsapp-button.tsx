import { linkWhatsapp } from "@/lib/format";

export function WhatsappButton({
  mensagem,
  className = "",
  children,
}: {
  mensagem: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={linkWhatsapp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:brightness-95 ${className}`}
    >
      {children}
    </a>
  );
}

export function WhatsappFloatingButton() {
  return (
    <a
      href={linkWhatsapp("Olá! Vi o site e gostaria de mais informações.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.362.687 4.564 1.874 6.417L4 29l7.79-1.845A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Zm0 21.8a9.77 9.77 0 0 1-4.98-1.36l-.357-.212-4.62 1.094 1.128-4.5-.234-.37A9.78 9.78 0 0 1 5.2 15C5.2 9.04 10.04 4.2 16 4.2 21.96 4.2 26.8 9.04 26.8 15S21.96 24.8 16 24.8Zm5.42-7.36c-.297-.148-1.755-.866-2.027-.965-.272-.099-.47-.148-.668.148-.198.297-.767.965-.94 1.163-.173.198-.347.223-.644.075-.297-.148-1.254-.462-2.388-1.472-.883-.787-1.48-1.76-1.653-2.057-.173-.297-.018-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.148-.668-1.61-.916-2.205-.241-.579-.486-.5-.668-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.478s1.065 2.874 1.213 3.072c.148.198 2.096 3.2 5.078 4.487.709.306 1.262.489 1.693.626.711.226 1.358.194 1.87.118.57-.085 1.755-.717 2.002-1.41.247-.693.247-1.286.173-1.41-.074-.124-.272-.198-.57-.347Z" />
      </svg>
    </a>
  );
}
