"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { QrCode as QrIcon } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import DownloadButton from "@/components/DownloadButton";

export default function QrCodeTool() {
  const [text, setText] = useState("https://criegratis.com.br");
  const [dataUrl, setDataUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!text.trim()) {
      setDataUrl("");
      setError("Por favor, digite um texto ou URL para gerar o QR Code.");
      return;
    }

    setError(null);
    QRCode.toDataURL(text.trim(), {
      width: 400,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((url) => {
        setDataUrl(url);
      })
      .catch((err) => {
        console.error("Erro ao gerar QR Code:", err);
        setError("Erro ao gerar o QR Code. O texto pode ser longo demais.");
      });
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Formulário de Configuração */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <label htmlFor="qr-input" className="block text-sm font-semibold text-[#0F172A] dark:text-white mb-1.5">
              URL ou Texto do QR Code
            </label>
            <textarea
              id="qr-input"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://exemplo.com.br ou qualquer texto..."
              className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-sm text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] shadow-inner transition-all focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
            />
            {error && <p className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>}
          </div>

          <div className="rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 p-4 text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
            <p className="font-semibold mb-1">Dica de uso:</p>
            Você pode inserir links de sites, redes sociais, chave Pix, redes Wi-Fi ou mensagens curtas. O QR Code é atualizado instantaneamente!
          </div>
        </div>

        {/* Preview e Ações */}
        <div className="md:col-span-5 flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-6 text-center">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-4">
            Preview do QR Code
          </h3>

          <div className="relative flex h-60 w-60 items-center justify-center rounded-2xl bg-white p-3 shadow-md border border-slate-100 mb-6">
            {dataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={dataUrl} alt="QR Code Gerado" className="h-full w-full object-contain rounded-lg" />
            ) : (
              <div className="flex flex-col items-center text-slate-300">
                <QrIcon className="h-16 w-16 mb-2" />
                <span className="text-xs text-slate-400">Aguardando entrada...</span>
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            {dataUrl && (
              <>
                <DownloadButton
                  href={dataUrl}
                  downloadFileName="qrcode-crie-gratis.png"
                  label="Baixar PNG"
                  size="md"
                />
                <CopyButton text={text} label="Copiar Texto" variant="outline" size="md" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
