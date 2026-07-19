import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { MousePlayProvider } from "@/hooks/use-mouse-play";
import { CursorSpotlight } from "@/components/cursor-spotlight";

// Space Grotesk: títulos, nome gigante e números de métrica.
const display = Space_Grotesk({
  variable: "--fonte-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Satoshi (Fontshare, self-host): corpo de texto.
const sans = localFont({
  variable: "--fonte-sans",
  src: [
    { path: "../fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/satoshi-700.woff2", weight: "700", style: "normal" },
  ],
});

// JetBrains Mono: só em rótulos técnicos pontuais (stack, metadados).
const mono = JetBrains_Mono({
  variable: "--fonte-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Gabriel Diogo · Desenvolvedor Full Stack",
  description:
    "Desenvolvedor full stack de Goiânia. Construo sistemas de ponta a ponta que pessoas de verdade usam todo dia.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LenisProvider>
          <MousePlayProvider>
            <CursorSpotlight />
            {children}
          </MousePlayProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
