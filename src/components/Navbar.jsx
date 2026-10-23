"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", rotulo: "Roteiros" },
  { href: "/professor/", rotulo: "Área do professor" },
];

export default function Navbar() {
  const caminho = usePathname();

  return (
    <header className="bg-navbar text-white">
      <nav className="mx-auto flex min-h-[70px] max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2">
        <Link href="/" className="text-lg font-bold">
          Roteiros de Estudo
        </Link>
        <ul className="flex gap-4 text-sm font-medium sm:text-base">
          {LINKS.map(({ href, rotulo }) => {
            const ativo = href === "/" ? caminho === "/" : caminho.startsWith(href.slice(0, -1));
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={ativo ? "page" : undefined}
                  className={`border-b-2 pb-0.5 hover:opacity-80 ${ativo ? "border-white" : "border-transparent"}`}
                >
                  {rotulo}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
