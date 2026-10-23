"use client";

import { useEffect } from "react";
import { IconeFechar } from "./Icones";

export default function Modal({ aberto, aoFechar, titulo, children }) {
  useEffect(() => {
    if (!aberto) return;
    function teclar(e) {
      if (e.key === "Escape") aoFechar();
    }
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", teclar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", teclar);
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onClick={aoFechar}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white px-5 pb-6 pt-16 shadow-xl sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:opacity-70"
        >
          <IconeFechar className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
