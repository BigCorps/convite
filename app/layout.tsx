import type { Metadata, Viewport } from "next";
import { Pinyon_Script, Quicksand } from "next/font/google";
import { convite } from "@/data/convite";
import "./globals.css";

// Geométrica no estilo Century Gothic, para casar com o site do Casar.com.
const corpo = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--fonte-corpo",
  display: "swap",
});

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--fonte-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://convite.bigcorps.com.br"),
  applicationName: "Casamento Miriam e Ithiel",
  title: "Casamento Miriam e Ithiel",
  description: `${convite.noivos.completo} convidam para a cerimônia de casamento.`,
  appleWebApp: {
    capable: true,
    title: "Miriam e Ithiel",
    statusBarStyle: "default",
  },
  openGraph: {
    siteName: "Casamento Miriam e Ithiel",
    title: "Casamento Miriam e Ithiel",
    description: `${convite.data.extenso} · ${convite.local.nome}`,
    images: [convite.foto.src],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FDF8F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${corpo.variable} ${script.variable}`}>
      <body className="travado">{children}</body>
    </html>
  );
}
