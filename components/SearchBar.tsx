"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, Wrench, X } from "lucide-react";
import { searchTools, ToolInfo } from "@/lib/tools";

interface SearchBarProps {
  autoFocus?: boolean;
  onSelectTool?: () => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  autoFocus = false,
  onSelectTool,
  placeholder = "Buscar ferramenta...",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolInfo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setResults(searchTools(val));
    } else {
      setResults([]);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] py-3.5 pl-4 pr-11 text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] shadow-xs transition-all focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 dark:focus:ring-[#38BDF8]/15 text-sm sm:text-base font-normal"
        />
        <div className="absolute right-4 flex items-center gap-1.5">
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="rounded-full p-1 text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <Search className="h-5 w-5 text-[#94A3B8] pointer-events-none" />
          )}
        </div>
      </div>

      {/* Resultados Instantâneos */}
      {query.trim() !== "" && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-2 shadow-xl">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">
                {results.length} {results.length === 1 ? "ferramenta encontrada" : "ferramentas encontradas"}
              </div>
              {results.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  onClick={() => {
                    if (onSelectTool) onSelectTool();
                    setQuery("");
                    setResults([]);
                  }}
                  className="flex items-center justify-between rounded-xl p-3 hover:bg-blue-50/70 dark:hover:bg-[#0F172A] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100/70 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#38BDF8] group-hover:bg-[#2563EB] dark:group-hover:bg-[#38BDF8] group-hover:text-white dark:group-hover:text-[#0F172A] transition-colors">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                        {tool.name}
                      </p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-1">{tool.shortDescription}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
              Nenhuma ferramenta encontrada para &quot;<span className="font-semibold text-[#0F172A] dark:text-white">{query}</span>&quot;.
              <div className="mt-2 text-xs text-[#94A3B8] dark:text-[#64748B]">
                Tente buscar por termos simples como &quot;imagem&quot;, &quot;senha&quot;, &quot;qr&quot; ou &quot;porcentagem&quot;.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
