import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lis Nery Corretora de Imóveis",
    template: "%s · Lis Nery Corretora de Imóveis",
  },
  description:
    "Encontre apartamentos, casas e imóveis comerciais com a Lis Nery, corretora de imóveis (CRECI-BA 24521).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ln-ink">{children}</body>
    </html>
  );
}
