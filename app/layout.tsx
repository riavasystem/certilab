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
        <main className="flex-1 ml-64 p-8 bg-background overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
