import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crie Grátis — Ferramentas Gratuitas",
    short_name: "Crie Grátis",
    description: "Ferramentas online gratuitas para criar, converter e resolver diretamente no navegador.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F19",
    theme_color: "#0B0F19",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
