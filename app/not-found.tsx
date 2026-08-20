import React from "react";
import Link from "next/link";
import { Wrench, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 mb-6 border border-blue-100">
        <Wrench className="h-10 w-10" />
      </div>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 mb-2">
        Erro 404
      </span>

      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
        Página não encontrada
      </h1>

      <p className="mt-3 max-w-md text-sm text-slate-600 leading-relaxed">
        A ferramenta ou página que você procurou não foi encontrada ou mudou de endereço.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
        >
          <Home className="h-4 w-4" />
          Voltar para a Página Inicial
        </Link>
        <Link
          href="/ferramentas"
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
        >
          <Search className="h-4 w-4" />
          Ver todas as ferramentas
        </Link>
      </div>
    </div>
  );
}
