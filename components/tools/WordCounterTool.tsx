"use client";

import React, { useState } from "react";
import { Trash2, Clock, Volume2 } from "lucide-react";
import CopyButton from "@/components/CopyButton";

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const trimmedText = text.trim();
  const wordCount = trimmedText ? trimmedText.split(/\s+/).filter(Boolean).length : 0;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, "").length;
  const lineCount = text ? text.split("\n").length : 0;

  // Leitura média ~200 palavras por minuto; Fala média ~130 PPM
  const readingTimeMin = Math.ceil(wordCount / 200);
  const speakingTimeMin = Math.ceil(wordCount / 130);

  return (
    <div className="space-y-6">
      {/* Grid de Métricas Rápida */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8] mb-1">Palavras</p>
          <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white">{wordCount}</p>
        </div>

        <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">Caracteres</p>
          <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white">{charCount}</p>
        </div>

        <div className="rounded-2xl border border-amber-100 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Sem Espaços</p>
          <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white">{charNoSpaces}</p>
        </div>

        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/30 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Linhas</p>
          <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white">{lineCount}</p>
        </div>
      </div>

      {/* Caixa de Texto */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="word-input" className="text-sm font-semibold text-[#0F172A] dark:text-white">
            Digite ou cole seu texto abaixo:
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
          id="word-input"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comece a digitar ou cole um artigo, redação ou mensagem aqui para contar instantaneamente..."
          className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-4 text-sm text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] shadow-inner transition-all focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 leading-relaxed"
        />
      </div>

      {/* Estimativas de Leitura e Fala */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] p-4 text-xs text-[#475569] dark:text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#2563EB] dark:text-[#38BDF8]" />
          <span>Tempo estimado de leitura silenciosa: <strong>~{readingTimeMin} min</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-[#10B981] dark:text-[#34D399]" />
          <span>Tempo estimado de fala em voz alta: <strong>~{speakingTimeMin} min</strong></span>
        </div>
      </div>
    </div>
  );
}
