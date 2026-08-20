"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("criegratis-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("criegratis-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("criegratis-theme", "dark");
      setIsDark(true);
    }
  };

  if (!mounted) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#64748B] opacity-70 ${className}`}>
        <Moon className="h-4 w-4" />
        <span className="hidden sm:inline">Escuro</span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
      className={`group relative flex items-center gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F1F5F9] shadow-2xs hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:bg-white dark:hover:bg-[#0F172A] transition-all duration-200 cursor-pointer active:scale-95 ${className}`}
    >
      <div className="relative h-4 w-4">
        {isDark ? (
          <Sun className="h-4 w-4 text-[#F59E0B] transition-transform duration-300 rotate-0 group-hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-[#2563EB] transition-transform duration-300 rotate-0 group-hover:-rotate-12" />
        )}
      </div>
      <span className="hidden sm:inline transition-colors font-medium">
        {isDark ? "Claro" : "Escuro"}
      </span>
    </button>
  );
}
