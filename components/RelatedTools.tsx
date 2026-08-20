import React from "react";
import { ToolInfo, TOOLS } from "@/lib/tools";
import ToolGrid from "./ToolGrid";

interface RelatedToolsProps {
  currentSlug: string;
  category: string;
  limit?: number;
}

export default function RelatedTools({ currentSlug, category, limit = 3 }: RelatedToolsProps) {
  // Filtra outras ferramentas da mesma categoria primeiro, depois outras populares se necessário
  let related = TOOLS.filter((t) => t.category === category && t.slug !== currentSlug);

  if (related.length < limit) {
    const others = TOOLS.filter((t) => t.slug !== currentSlug && !related.some((r) => r.slug === t.slug));
    related = [...related, ...others];
  }

  const finalTools = related.slice(0, limit);

  return (
    <section className="mt-16 border-t border-slate-200/80 pt-12">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Ferramentas Relacionadas
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Outras ferramentas gratuitas que podem ser úteis para você.
        </p>
      </div>

      <ToolGrid tools={finalTools} />
    </section>
  );
}
