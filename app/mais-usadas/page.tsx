import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import ToolGrid from "@/components/ToolGrid";
import AdPlaceholder from "@/components/AdPlaceholder";
import { ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Ferramentas Mais Usadas Gratuitas | Crie Grátis",
  description: "Descubra as ferramentas mais populares e acessadas do Crie Grátis: QR Code, Compressão de Imagens, Gerador de Senhas e Calculadoras.",
};

export default function MaisUsadasPage() {
  // Principais ferramentas ranqueadas
  const topTools = TOOLS.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header da Página */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Ferramentas Mais Usadas
          </h1>
          <p className="text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            As soluções preferidas pelos nossos usuários para converter, criar, calcular e editar no navegador com rapidez absoluta.
          </p>
        </div>

        {/* Destaques Top 3 com Visual de Pódio */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTools.slice(0, 3).map((tool, idx) => {
            const ranks = [
              { label: "1.º Mais Usada", badgeBg: "bg-amber-500 text-white", border: "border-amber-300 dark:border-amber-700/60" },
              { label: "2.º Mais Usada", badgeBg: "bg-slate-500 text-white", border: "border-slate-300 dark:border-slate-700" },
              { label: "3.º Mais Usada", badgeBg: "bg-amber-700 text-white", border: "border-amber-800/40 dark:border-amber-900" },
            ];

            return (
              <div
                key={tool.slug}
                className={`relative flex flex-col justify-between rounded-3xl border ${ranks[idx].border} bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${ranks[idx].badgeBg}`}>
                      <Award className="h-3.5 w-3.5" />
                      {ranks[idx].label}
                    </span>
                    <span className="text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8] capitalize">
                      {tool.category.replace("-", " ")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    {tool.fullDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1F5F9] dark:border-[#334155]">
                  <Link
                    href={tool.href}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
                  >
                    Usar Ferramenta Grátis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        {/* Todas as Ferramentas Populares */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">
                Lista Completa das Mais Acessadas
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-0.5">
                Prontas para uso instantâneo, sem filas e 100% no seu computador ou celular.
              </p>
            </div>
            <Link
              href="/ferramentas"
              className="text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline"
            >
              Ver todas ({TOOLS.length})
            </Link>
          </div>

          <ToolGrid tools={topTools} />
        </section>

        <AdPlaceholder slot="mais-usadas-bottom" format="horizontal" />
      </div>
    </div>
  );
}
