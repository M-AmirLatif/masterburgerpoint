import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Master Burger Point - Kasur",
    short_name: "Master Burger",
    description: "Kasur's Oldest & Most Famous Burger Shop on Railway Road, Chandni Chowk.",
    start_url: "/",
    display: "standalone",
    background_color: "#120E0C",
    theme_color: "#FFC20E",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
