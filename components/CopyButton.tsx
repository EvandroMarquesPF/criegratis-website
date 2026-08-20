"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function CopyButton({
  text,
  label = "Copiar",
  copiedLabel = "Copiado!",
  className = "",
  variant = "primary",
  size = "md",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar texto:", err);
    }
  };

  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary: copied
      ? "bg-[#10B981] text-white shadow-sm"
      : "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm active:scale-[0.98]",
    secondary: copied
      ? "bg-emerald-50 dark:bg-emerald-950/40 text-[#10B981] border border-emerald-200 dark:border-emerald-800"
      : "bg-[#F1F5F9] dark:bg-[#334155] text-[#0F172A] dark:text-white hover:bg-[#E2E8F0] dark:hover:bg-[#475569] active:scale-[0.98]",
    outline: copied
      ? "border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-[#10B981]"
      : "border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] hover:border-[#CBD5E1] active:scale-[0.98]",
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        !text ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}
