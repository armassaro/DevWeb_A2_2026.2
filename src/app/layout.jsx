import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Roteiros de Estudo",
  description: "Roteiros de estudo gerados por IA e revisados por professores da rede municipal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">{children}</main>
      </body>
    </html>
  );
}
