import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CertiLab - Prep AWS AI Practitioner",
  description: "Plataforma de estudio para certificaciones AWS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
      <body className="flex h-full">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 bg-background overflow-auto flex flex-col">
          <div className="flex-1">{children}</div>
          <footer className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>
              Preguntas elaboradas originalmente basadas en los objetivos oficiales del examen AIF-C01 y documentación de AWS.
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
