"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Smartphone, X, Share2, PlusSquare } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

function getIsStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as NavigatorWithStandalone;
  return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}

function subscribeStandalone(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(display-mode: standalone)");
  media.addEventListener("change", callback);
  window.addEventListener("appinstalled", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("appinstalled", callback);
  };
}

export default function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [manualInstalled, setManualInstalled] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);

  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getIsStandalone,
    () => false
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      if (isIosDevice) {
        setShowIosModal(true);
        return;
      }
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === "accepted") {
        setManualInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowIosModal(true);
    }
  };

  if (isStandalone || manualInstalled) return null;

  return (
    <>
      {/* Botão de Instalar / Atalho */}
      <button
        onClick={handleInstallClick}
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#2563EB]/30 dark:border-[#38BDF8]/30 bg-blue-50/60 dark:bg-blue-950/40 px-3 py-2 text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:text-[#0F172A] transition-all duration-150 cursor-pointer shadow-2xs w-full sm:w-auto justify-center"
        aria-label="Instalar App / Criar Atalho"
      >
        <Smartphone className="h-4 w-4 shrink-0" />
        <span>Criar Atalho / App</span>
      </button>

      {/* Modal Guia para iOS / Navegadores Manuais */}
      {showIosModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowIosModal(false);
          }}
        >
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-white text-base">
                <Smartphone className="h-5 w-5 text-[#2563EB] dark:text-[#38BDF8]" />
                <span>Instalar Crie Grátis</span>
              </div>
              <button
                onClick={() => setShowIosModal(false)}
                className="rounded-full p-1 text-[#64748B] hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Adicione o Crie Grátis à tela de início do seu celular para acessar todas as ferramentas com 1 toque como um aplicativo:
            </p>

            <div className="space-y-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-xs font-medium text-[#0F172A] dark:text-white border border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white text-[11px] font-bold">
                  1
                </span>
                <span className="flex items-center gap-1.5">
                  Toque no botão de <strong>Compartilhar</strong> <Share2 className="h-3.5 w-3.5 text-[#2563EB]" />
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white text-[11px] font-bold">
                  2
                </span>
                <span className="flex items-center gap-1.5">
                  Selecione <strong>Adicionar à Tela de Início</strong> <PlusSquare className="h-3.5 w-3.5 text-[#10B981]" />
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIosModal(false)}
              className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white hover:bg-[#1D4ED8] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}

