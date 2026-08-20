"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import { loadImageFromFile, resizeImage, formatFileSize } from "@/lib/image-utils";
import { Lock, Unlock } from "lucide-react";

export default function ImageResizeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [keepAspect, setKeepAspect] = useState<boolean>(true);
  const [format, setFormat] = useState<string>("image/jpeg");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    try {
      const { img, width: w, height: h } = await loadImageFromFile(selectedFile);
      setOrigWidth(w);
      setOrigHeight(h);
      setAspectRatio(w / h);
      setWidth(w);
      setHeight(h);
      setPreviewUrl(img.src);

      // Detecta formato inicial
      if (selectedFile.type === "image/png") setFormat("image/png");
      else if (selectedFile.type === "image/webp") setFormat("image/webp");
      else setFormat("image/jpeg");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao carregar imagem.");
    }
  };

  const handleWidthChange = (val: number | "") => {
    setWidth(val);
    if (keepAspect && val !== "" && aspectRatio > 0) {
      setHeight(Math.round(Number(val) / aspectRatio));
    }
  };

  const handleHeightChange = (val: number | "") => {
    setHeight(val);
    if (keepAspect && val !== "" && aspectRatio > 0) {
      setWidth(Math.round(Number(val) * aspectRatio));
    }
  };

  const handleResize = async () => {
    if (!file || !width || !height) return;
    setIsProcessing(true);
    setError(null);

    try {
      const result = await resizeImage(file, Number(width), Number(height), format, 0.9);
      setResizedUrl(result.url);
      setResizedBlob(result.blob);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao redimensionar imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setResizedUrl(null);
    setResizedBlob(null);
    setWidth("");
    setHeight("");
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Painel de Controles */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 break-all">{file.name}</p>
                <p className="text-xs text-slate-500">
                  Tamanho Original: <strong>{origWidth} × {origHeight} px</strong> ({formatFileSize(file.size)})
                </p>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                Trocar Foto
              </button>
            </div>

            {/* Inputs Largura x Altura */}
            <div className="space-y-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Novas Dimensões (Pixels)
              </label>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Largura (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Altura (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Lock Proporção */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepAspect}
                    onChange={(e) => setKeepAspect(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  {keepAspect ? <Lock className="h-3.5 w-3.5 text-blue-600" /> : <Unlock className="h-3.5 w-3.5 text-slate-400" />}
                  Manter Proporção Original
                </label>

                <button
                  onClick={() => {
                    setWidth(origWidth);
                    setHeight(origHeight);
                  }}
                  className="text-[11px] text-blue-600 hover:underline"
                >
                  Restaurar Original
                </button>
              </div>
            </div>

            {/* Formato de Saída */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Formato de Saída
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="image/jpeg">JPG / JPEG (Recomendado para fotos)</option>
                <option value="image/png">PNG (Excelente qualidade)</option>
                <option value="image/webp">WebP (Formato leve para web)</option>
              </select>
            </div>

            <button
              onClick={handleResize}
              disabled={isProcessing || !width || !height}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white hover:bg-blue-700 active:scale-[0.99] shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? "Redimensionando..." : "Redimensionar Imagem"}
            </button>

            {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
          </div>

          {/* Preview da Imagem */}
          <div className="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              {resizedUrl ? "Resultado Redimensionado" : "Pré-visualização da Foto"}
            </h4>

            <div className="relative max-h-72 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white p-2 border border-slate-200 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resizedUrl || previewUrl || ""}
                alt="Preview"
                className="max-h-64 object-contain rounded-lg"
              />
            </div>

            {resizedBlob && resizedUrl && (
              <div className="space-y-3 w-full">
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800">
                  Nova imagem gerada com sucesso ({width} × {height} px) — {formatFileSize(resizedBlob.size)}
                </div>
                <DownloadButton
                  href={resizedUrl}
                  downloadFileName={`redimensionada-${width}x${height}.${format.split("/")[1]}`}
                  label="Baixar Imagem Redimensionada"
                  size="lg"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
