import React from "react";

interface AdPlaceholderProps {
  slot?: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

export default function AdPlaceholder({
  slot = "default",
  format = "horizontal",
  className = "",
}: AdPlaceholderProps) {
  const heightClasses = {
    auto: "min-h-[100px]",
    horizontal: "h-24 sm:h-28",
    rectangle: "h-64",
  };

  return (
    <div
      className={`my-8 flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-center text-[#94A3B8] dark:text-[#64748B] ${heightClasses[format]} ${className}`}
      data-ad-slot={slot}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] dark:text-[#64748B]">
        <span>Publicidade</span>
      </div>
      <p className="mt-0.5 text-xs text-[#94A3B8] dark:text-[#64748B]">Espaço reservado para apoio à plataforma gratuita</p>
    </div>
  );
}
