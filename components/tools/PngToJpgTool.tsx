"use client";

import React, { useState, useEffect } from "react";
import FileDropzone from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import { convertPngToJpg, loadImageFromFile } from "@/lib/image-utils";

export default function PngToJpgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [quality, setQuality] = useState<number>(90);
  const [jpgUrl, setJpgUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    const { img } = await loadImageFromFile(selectedFile);
    setPreviewUrl(img.src);
    runConversion(selectedFile, bgColor, quality);
  };

  const runConversion = async (targetFile: File, bg: string, q: number) => {
    setIsConverting(true);
    try {
      const res = await convertPngToJpg(targetFile, bg, q);
      setJpgUrl(res.url);
    } catch (err) {
      console.error("Erro ao converter PNG para JPG:", err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleBgColorChange = (newBg: string) => {
    setBgColor(newBg);
    if (file) runConversion(file, newBg, quality);
  };

  const handleQualityChange = (newQ: number) => {
    setQuality(newQ);
    if (file) runConversion(file, bgColor, newQ);
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setJpgUrl(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone accept="image/png" onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Opções e Configurações */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 break-all">{file.name}</p>
                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 mt-1">
                  Formato Inicial: PNG
                </span>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                Trocar Foto
              </button>
            </div>

            {/* Tratar Transparência */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Fundo para Áreas Transparentes
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => handleBgColorChange(e.target.value)}
                  className="h-10 w-12 rounded-lg border border-slate-200 p-0.5 cursor-pointer bg-white"
                />
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  <button
                    onClick={() => handleBgColorChange("#FFFFFF")}
                    className={`rounded-lg border px-3 py-1.5 ${
                      bgColor === "#FFFFFF" ? "border-blue-600 bg-blue-50 text-blue-700 font-bold" : "border-slate-200 bg-white"
                    }`}
                  >
                    Branco (#FFFFFF)
                  </button>
                  <button
                    onClick={() => handleBgColorChange("#000000")}
                    className={`rounded-lg border px-3 py-1.5 ${
                      bgColor === "#000000" ? "border-blue-600 bg-blue-50 text-blue-700 font-bold" : "border-slate-200 bg-white"
                    }`}
                  >
                    Preto (#000000)
                  </button>
                </div>
              </div>
            </div>

            {/* Qualidade JPG */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Qualidade do JPG</span>
                <span className="font-mono text-blue-600">{quality}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={quality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {jpgUrl && (
              <DownloadButton
                href={jpgUrl}
                downloadFileName={`${file.name.replace(/\.[^/.]+$/, "")}.jpg`}
                label="Baixar Imagem em JPG"
                size="lg"
                className="w-full"
              />
            )}
          </div>

          {/* Preview */}
          <div className="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Preview em JPG (Com Fundo Preenchido)
            </h4>

            <div
              className="relative max-h-72 w-full flex items-center justify-center overflow-hidden rounded-xl p-2 border border-slate-200"
              style={{ backgroundColor: bgColor }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={jpgUrl || previewUrl || ""}
                alt="Preview JPG"
                className="max-h-64 object-contain rounded-lg"
              />
            </div>
            {isConverting && <p className="text-xs text-blue-600 font-medium mt-3">Atualizando JPG...</p>}
          </div>
        </div>
      )}
    </div>
  );
}
