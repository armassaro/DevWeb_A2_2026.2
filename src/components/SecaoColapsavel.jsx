"use client";

import { useState } from "react";
import { IconeSeta } from "./Icones";

export default function SecaoColapsavel({ titulo, quantidade, inicialAberta = true, children }) {
  const [aberta, setAberta] = useState(inicialAberta);

  return (
    <section className="min-w-0">
      <button
        type="button"
        onClick={() => setAberta(!aberta)}
        aria-expanded={aberta}
        className="mb-3 flex w-full items-center justify-center gap-2 font-semibold uppercase text-marinho hover:opacity-70"
      >
        {titulo}
        <span className="rounded-full bg-marinho px-2 text-xs text-white">{quantidade}</span>
        <IconeSeta className={`h-4 w-4 transition-transform ${aberta ? "rotate-90" : ""}`} />
      </button>
      {aberta && children}
    </section>
  );
}
