"use client";

import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { formatFileSize } from "@/lib/image-utils";

interface FileDropzoneProps {
  accept?: string;
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  onClear?: () => void;
  maxSizeMB?: number;
}

export default function FileDropzone({
  accept = "image/jpeg,image/png,image/webp",
  onFileSelect,
  selectedFile,
  onClear,
  maxSizeMB = 20,
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSelect = (file: File) => {
    setErrorMsg(null);
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMsg(`O arquivo é muito grande (máximo de ${maxSizeMB}MB).`);
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelect(e.target.files[0]);
    }
  };

  if (selectedFile) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-4 sm:p-6 text-center shadow-xs">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8] border border-blue-100 dark:border-blue-900/50">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F172A] dark:text-white break-all">{selectedFile.name}</p>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">{formatFileSize(selectedFile.size)}</p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              Trocar arquivo
            </button>
            {onClear && (
              <button
                onClick={onClear}
                className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-3.5 py-1.5 text-xs font-semibold text-[#EF4444] hover:bg-rose-100 transition-colors cursor-pointer"
              >
                Remover
              </button>
            )}
          </div>
        </div>
        <input ref={inputRef} type="file" accept={accept} onChange={handleInputChange} className="hidden" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? "border-[#2563EB] dark:border-[#38BDF8] bg-blue-50/50 dark:bg-blue-950/30 scale-[0.99]"
            : "border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:bg-blue-50/20 dark:hover:bg-blue-950/20"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8] group-hover:scale-105 transition-transform duration-200 border border-blue-100 dark:border-blue-900/50">
          <Upload className="h-7 w-7" />
        </div>

        <p className="mt-4 text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
          Arraste e solte seu arquivo aqui
        </p>
        <p className="mt-1 text-xs sm:text-sm text-[#2563EB] dark:text-[#38BDF8] font-medium group-hover:underline">
          ou clique para selecionar
        </p>
        <p className="mt-3 text-[11px] font-medium text-[#94A3B8] dark:text-[#64748B]">
          Formatos suportados: JPG, PNG, WebP (máx. {maxSizeMB}MB)
        </p>

        <input ref={inputRef} type="file" accept={accept} onChange={handleInputChange} className="hidden" />
      </div>

      {errorMsg && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#FEF2F2] dark:bg-rose-950/40 p-3 text-xs font-semibold text-[#EF4444] border border-[#FECACA] dark:border-rose-900/50">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
