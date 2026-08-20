"use client";

import React, { useState } from "react";
import { Trash2, AlertCircle } from "lucide-react";
import CopyButton from "@/components/CopyButton";

const PRESETS = [
  { label: "Twitter/X Post", limit: 280 },
  { label: "Instagram Bio", limit: 150 },
  { label: "SEO Título", limit: 60 },
  { label: "SEO Descrição", limit: 160 },
  { label: "Sem Limite", limit: 0 },
];

export default function CharacterCounterTool() {
  const [text, setText] = useState("");
  const [selectedLimit, setSelectedLimit] = useState(280);
  const [customLimit, setCustomLimit] = useState<number | "">("");

  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, "").length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const currentLimit = customLimit !== "" ? Number(customLimit) : selectedLimit;

  const remaining = currentLimit > 0 ? currentLimit - charCount : null;
  const percentage = currentLimit > 0 ? Math.min(100, Math.round((charCount / currentLimit) * 100)) : 0;

  return (
    <div className="space-y-6">
      {/* Seletor de Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block">
          Selecionar Limite Recomendado
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setSelectedLimit(p.limit);
                setCustomLimit("");
              }}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedLimit === p.limit && customLimit === ""
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {p.label} {p.limit > 0 ? `(${p.limit})` : ""}
            </button>
          ))}

          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Personalizado:</span>
            <input
              type="number"
              value={customLimit}
              onChange={(e) => setCustomLimit(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Ex: 500"
              className="w-20 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-1 text-center text-xs text-[#0F172A] dark:text-white focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8] mb-1">Caracteres</p>
          <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white">{charCount}</p>
        </div>

        <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">Sem Espaços</p>
          <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white">{charNoSpaces}</p>
        </div>

        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Palavras</p>
          <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white">{wordCount}</p>
        </div>

        <div className="rounded-2xl border border-amber-100 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            {currentLimit > 0 ? "Restantes" : "Limite"}
          </p>
          <p className={`text-3xl font-extrabold ${remaining !== null && remaining < 0 ? "text-rose-600 dark:text-rose-400" : "text-[#0F172A] dark:text-white"}`}>
            {currentLimit > 0 ? (remaining !== null ? remaining : "---") : "Livre"}
          </p>
        </div>
      </div>

      {/* Barra de Progresso do Limite */}
      {currentLimit > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
            <span>Uso do limite: {percentage}%</span>
            <span>{charCount} / {currentLimit} caracteres</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8F0] dark:bg-[#334155]">
            <div
              className={`h-full transition-all duration-300 ${
                percentage >= 100
                  ? "bg-rose-500"
                  : percentage >= 85
                  ? "bg-amber-500"
                  : "bg-[#2563EB]"
              }`}
              style={{ width: `${Math.min(100, (charCount / currentLimit) * 100)}%` }}
            />
          </div>
          {remaining !== null && remaining < 0 && (
            <p className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 pt-1">
              <AlertCircle className="h-3.5 w-3.5" />
              Você excedeu o limite em {Math.abs(remaining)} caracteres.
            </p>
          )}
        </div>
      )}

      {/* Caixa de Texto */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="char-input" className="text-sm font-semibold text-[#0F172A] dark:text-white">
            Texto para contagem:
          </label>
          <div className="flex items-center gap-2">
            {text && (
              <button
                onClick={() => setText("")}
                className="flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Limpar
              </button>
            )}
            <CopyButton text={text} size="sm" variant="outline" />
          </div>
        </div>

        <textarea
          id="char-input"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite ou cole seu texto para testar o limite de caracteres..."
          className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-4 text-sm text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] shadow-inner transition-all focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 leading-relaxed"
        />
      </div>
    </div>
  );
}
