"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Smartphone, Download, X, Share2, PlusSquare, Sparkles } from "lucide-react";

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

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getIsStandalone,
    () => false
  );

  useEffect(() => {
    // Registra o Service Worker para ativar os critérios PWA do Chromium / Android
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Exibe o banner suavemente após 2.5 segundos de navegação no primeiro acesso
    const timer = setTimeout(() => {
      const dismissed = typeof window !== "undefined" && localStorage.getItem("criegratis-pwa-dismissed") === "true";
      if (!isStandalone && !dismissed) {
        setShowBanner(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [isStandalone]);

  const handleDismiss = () => {
    setShowBanner(false);
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("criegratis-pwa-dismissed", "true");
    }
  };

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
        handleDismiss();
      }
      setDeferredPrompt(null);
    } else {
      setShowIosModal(true);
    }
  };

  if (isStandalone || isDismissed || !showBanner) return null;

  return (
    <>
      {/* Banner Flutuante no Rodapé */}
      <aside
        aria-label="Aviso de Instalação do Aplicativo"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300 transition-all"
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#2563EB]/25 dark:border-[#38BDF8]/25 bg-white/95 dark:bg-[#1E293B]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          {/* Luz de destaque de fundo */}
          <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] text-white shadow-md shadow-blue-500/20">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[#0F172A] dark:text-white text-sm">
                  <span>Instalar o Crie Grátis</span>
                  <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
                </div>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed mt-0.5">
                  Acesse direto da tela de início, offline e 100% gratuito.
                </p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              aria-label="Fechar aviso"
              className="rounded-full p-1 text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2.5">
            <button
              onClick={handleDismiss}
              type="button"
              className="rounded-xl px-3 py-2 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] transition-colors"
            >
              Agora não
            </button>
            <button
              onClick={handleInstallClick}
              type="button"
              className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#38BDF8] dark:hover:bg-[#0EA5E9] px-4 py-2 text-xs font-bold text-white dark:text-[#0F172A] shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-150 active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Instalar Agora</span>
            </button>
          </div>
        </div>
      </aside>

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
              onClick={() => {
                setShowIosModal(false);
                handleDismiss();
              }}
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
