"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, X, TrendingUp } from "lucide-react";
import { searchTools, ToolInfo, TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolInfo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setResults(searchTools(val));
    } else {
      setResults([]);
    }
  };

  if (!isOpen) return null;

  const popularTools = TOOLS.slice(0, 6);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/40 dark:bg-black/60 p-3 pt-3 sm:pt-4 backdrop-blur-xs transition-opacity duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] shadow-2xl transition-all">
        {/* Barra de Entrada Spotlight */}
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] dark:border-[#334155] px-4 sm:px-5 py-3.5 bg-white dark:bg-[#1E293B]">
          <Search className="h-5 w-5 text-[#2563EB] dark:text-[#38BDF8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="O que você precisa hoje? (ex: QR Code, JPG, Senha, %...)"
            className="flex-1 bg-transparent text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] text-sm sm:text-base focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                inputRef.current?.focus();
              }}
              className="rounded-full p-1 text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] px-2 py-1 text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              ESC
            </button>
          )}
        </div>

        {/* Conteúdo: Resultados ou Sugestões */}
        <div className="max-h-[65vh] overflow-y-auto p-3 sm:p-4 space-y-4">
          {query.trim() !== "" ? (
            /* Lista de Resultados */
            results.length > 0 ? (
              <div className="space-y-1.5">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                  {results.length} {results.length === 1 ? "ferramenta encontrada" : "ferramentas encontradas"}
                </div>
                {results.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-3 hover:bg-blue-50/80 dark:hover:bg-[#0F172A] border border-transparent hover:border-blue-100 dark:hover:border-blue-900/40 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8] group-hover:bg-[#2563EB] dark:group-hover:bg-[#38BDF8] group-hover:text-white dark:group-hover:text-[#0F172A] transition-colors">
                        <Search className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                          {tool.name}
                        </p>
                        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-1">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] px-2 py-0.5 text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] capitalize">
                        {tool.category.replace("-", " ")}
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-[#64748B] dark:text-[#94A3B8]">
                <p className="text-sm font-medium">
                  Nenhuma ferramenta encontrada para &quot;<span className="font-bold text-[#0F172A] dark:text-white">{query}</span>&quot;.
                </p>
                <p className="mt-1 text-xs text-[#94A3B8] dark:text-[#64748B]">
                  Tente buscar por termos como imagem, senha, porcentagem, json ou qr code.
                </p>
              </div>
            )
          ) : (
            /* Sugestões Iniciais */
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
                  <span>Ferramentas Populares</span>
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {popularTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-xl p-2.5 border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:bg-white dark:hover:bg-[#1E293B] transition-colors group"
                    >
                      <span className="text-xs font-semibold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8]">
                        {tool.name}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                  Navegar por Categorias
                </div>
                <div className="mt-2 flex flex-wrap gap-2 px-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/ferramentas/${cat.slug}`}
                      onClick={onClose}
                      className="rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] px-3 py-1.5 text-xs font-semibold text-[#475569] dark:text-[#CBD5E1] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] px-4 sm:px-5 py-2.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded bg-white dark:bg-[#1E293B] px-1.5 py-0.5 text-[10px] font-mono border border-[#E2E8F0] dark:border-[#334155]">
              ESC
            </kbd>
            fechar
          </span>
          <span className="font-medium text-[#2563EB] dark:text-[#38BDF8]">Crie Grátis</span>
        </div>
      </div>
    </div>
  );
}
