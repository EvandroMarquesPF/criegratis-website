"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import { compressImage, formatFileSize, loadImageFromFile } from "@/lib/image-utils";
import { TrendingDown } from "lucide-react";

export default function ImageCompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [savedPercentage, setSavedPercentage] = useState<number | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    const { img } = await loadImageFromFile(selectedFile);
    setPreviewUrl(img.src);
    runCompression(selectedFile, quality);
  };

  const runCompression = async (targetFile: File, qualityValue: number) => {
    setIsCompressing(true);
    try {
      const res = await compressImage(targetFile, qualityValue);
      setCompressedUrl(res.url);
      setCompressedSize(res.compressedSize);
      setSavedPercentage(res.savedPercentage);
    } catch (err) {
      console.error("Erro na compressão:", err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleQualityChange = (val: number) => {
    setQuality(val);
    if (file) {
      runCompression(file, val);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setCompressedUrl(null);
    setCompressedSize(null);
    setSavedPercentage(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Slider e Configurações */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 break-all">{file.name}</p>
                <p className="text-xs text-slate-500">Tamanho Original: <strong>{formatFileSize(file.size)}</strong></p>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                Trocar Foto
              </button>
            </div>

            {/* Slider de Nível de Qualidade */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-800">
                  Nível de Qualidade Visual
                </label>
                <span className="rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700">
                  {quality}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={95}
                value={quality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Mais leve (- peso)</span>
                <span>Recomendado (75%)</span>
                <span>Mais nítido (+ peso)</span>
              </div>
            </div>

            {/* Resultado da Economia */}
            {compressedSize !== null && savedPercentage !== null && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <TrendingDown className="h-4 w-4 text-emerald-600" />
                    <span>Redução Alcançada</span>
                  </div>
                  <span className="rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-extrabold text-white">
                    {savedPercentage > 0 ? `-${savedPercentage}% menor` : "Tamanho otimizado"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center pt-2">
                  <div className="rounded-xl bg-white p-3 border border-emerald-100">
                    <p className="text-[10px] font-semibold uppercase text-slate-400">Peso Original</p>
                    <p className="text-sm font-bold text-slate-700">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 border border-emerald-200">
                    <p className="text-[10px] font-semibold uppercase text-emerald-600">Novo Peso Comprimido</p>
                    <p className="text-sm font-extrabold text-emerald-700">{formatFileSize(compressedSize)}</p>
                  </div>
                </div>
              </div>
            )}

            {compressedUrl && (
              <DownloadButton
                href={compressedUrl}
                downloadFileName={`comprimida-${file.name}`}
                label="Baixar Foto Otimizada"
                size="lg"
                className="w-full"
              />
            )}
          </div>

          {/* Preview da Foto */}
          <div className="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Comparação Visual de Nitidez
            </h4>

            <div className="relative max-h-72 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white p-2 border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={compressedUrl || previewUrl || ""}
                alt="Preview comprimido"
                className="max-h-64 object-contain rounded-lg"
              />
            </div>

            {isCompressing && (
              <p className="text-xs text-blue-600 font-medium mt-3 animate-pulse">
                Otimizando pixels no navegador...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
