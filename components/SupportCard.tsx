"use client";

import React, { useState } from "react";
import { Heart, Copy, Check, X } from "lucide-react";

export default function SupportCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pixKey = "pix@criegratis.com.br";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Card Discreto de Apoio */}
      <div className="rounded-2xl border border-rose-100 dark:border-rose-950/40 bg-gradient-to-r from-rose-50/50 via-white to-pink-50/50 dark:from-rose-950/20 dark:via-[#1E293B] dark:to-pink-950/20 p-5 sm:p-6 text-center shadow-2xs">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
            <span>Gostou do Crie Grátis?</span>
            <span className="text-rose-500 animate-pulse">❤️</span>
          </div>

          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            Ajude a manter as ferramentas gratuitas, rápidas e sem anúncios abusivos para todos.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all duration-150 cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>Apoiar o projeto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Apoio com Chave Pix */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 shadow-2xl space-y-5">
            {/* Fechar */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 rounded-full p-1.5 text-[#64748B] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center space-y-2 pt-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 border border-rose-100 dark:border-rose-900/50 mb-1">
                <Heart className="h-6 w-6 fill-rose-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white">
                Apoie o Crie Grátis
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                O Crie Grátis é e sempre será <strong>gratuito para todos</strong>. Se alguma ferramenta te ajudou, você pode contribuir voluntariamente com qualquer valor via Pix para ajudar nos custos de servidores e desenvolvimento.
              </p>
            </div>

            {/* Campo da Chave Pix */}
            <div className="space-y-2 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block">
                Chave Pix (E-mail)
              </span>
              
              <div className="flex items-center justify-center gap-2 font-mono text-sm sm:text-base font-bold text-[#2563EB] dark:text-[#38BDF8] select-all break-all">
                {pixKey}
              </div>

              <button
                onClick={handleCopyPix}
                type="button"
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-300" />
                    <span>Chave Pix Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copiar Chave Pix</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              Qualquer quantia faz uma enorme diferença. Muito obrigado pelo carinho! ❤️
            </p>
          </div>
        </div>
      )}
    </>
  );
}
