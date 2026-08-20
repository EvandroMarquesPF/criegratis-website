import React from "react";
import ToolCard from "./ToolCard";
import { ToolInfo } from "@/lib/tools";

interface ToolGridProps {
  tools: ToolInfo[];
  emptyMessage?: string;
}

export default function ToolGrid({
  tools,
  emptyMessage = "Nenhuma ferramenta encontrada.",
}: ToolGridProps) {
  if (!tools || tools.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
        <p className="text-base font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
