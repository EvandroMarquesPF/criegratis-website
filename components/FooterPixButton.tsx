"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function FooterPixButton() {
  const [copied, setCopied] = useState(false);
  const pixKey = "pix@criegratis.com.br";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-[#334155] bg-[#020617]/70 p-3.5 space-y-2.5 max-w-sm">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#94A3B8] font-medium">Chave Pix:</span>
        <span className="font-mono font-bold text-[#38BDF8] select-all">{pixKey}</span>
      </div>

      <button
        onClick={handleCopy}
        type="button"
        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#1E293B] hover:bg-[#2563EB] text-white py-2 px-3 text-xs font-semibold border border-[#334155] hover:border-[#2563EB] transition-all duration-150 cursor-pointer shadow-xs"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span>Chave Pix Copiada!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-[#38BDF8]" />
            <span>Copiar Chave Pix</span>
          </>
        )}
      </button>
    </div>
  );
}
