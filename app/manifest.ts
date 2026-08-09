import type { MetadataRoute } from "next";
import { convite } from "@/data/convite";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Casamento Miriam e Ithiel",
    short_name: "Miriam e Ithiel",
    description: `${convite.noivos.completo} · ${convite.data.extenso}`,
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fdf8f6",
    theme_color: "#b4767c",
    icons: [
      {
        src: "/icones/icone-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icones/icone-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icones/icone-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
