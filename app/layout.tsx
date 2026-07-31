import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://erereck.github.io/erilab/"),
  title: "EriLab // Terminal",
  description: "Site da EriLab: jogos, projetos e equipe em um terminal interativo.",
  openGraph: {
    title: "EriLab // Terminal",
    description: "Jogos, projetos e equipe da EriLab.",
    type: "website",
    images: [{ url: "https://erereck.github.io/erilab/og.png", width: 1536, height: 1024, alt: "EriLab // Terminal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EriLab // Terminal",
    description: "Jogos, projetos e equipe da EriLab.",
    images: ["https://erereck.github.io/erilab/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
