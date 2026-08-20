"use client";

import React, { useState } from "react";
import { formatJson, minifyJson, JsonValidationResult } from "@/lib/json-utils";
import CopyButton from "@/components/CopyButton";
import { AlertTriangle, CheckCircle2, Code2, Trash2, FileCode } from "lucide-react";

const SAMPLE_JSON = `{
  "plataforma": "Crie Grátis",
  "versao": "1.0.0",
  "ferramentas": [
    { "id": 1, "nome": "QR Code Generator", "ativo": true },
    { "id": 2, "nome": "Formatador JSON", "ativo": true }
  ],
  "privacidade": "100% Client-Side"
}`;

export default function JsonFormatterTool() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [validation, setValidation] = useState<JsonValidationResult>({ isValid: true });

  const handleFormat = (indent: number) => {
    if (!input.trim()) {
      setOutput("");
      setValidation({ isValid: true });
      return;
    }

    const res = formatJson(input, indent);
    setValidation(res);
    if (res.isValid && res.formatted !== undefined) {
      setOutput(res.formatted);
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setOutput("");
      setValidation({ isValid: true });
      return;
    }

    const res = minifyJson(input);
    setValidation(res);
    if (res.isValid && res.formatted !== undefined) {
      setOutput(res.formatted);
    }
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
    const res = formatJson(SAMPLE_JSON, 2);
    setValidation(res);
    if (res.formatted) setOutput(res.formatted);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setValidation({ isValid: true });
  };

  return (
    <div className="space-y-6">
      {/* Barra de Ações Rápidas */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleFormat(2)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.98] shadow-sm transition-all"
          >
            Formatar (2 Espaços)
          </button>
          <button
            onClick={() => handleFormat(4)}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-900 active:scale-[0.98] transition-all"
          >
            Formatar (4 Espaços)
          </button>
          <button
            onClick={handleMinify}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            Minificar / Compactar
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <FileCode className="h-3.5 w-3.5 text-[#2563EB]" />
            Carregar Exemplo
          </button>
          {input && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Banner de Erro ou Validação */}
      {!validation.isValid && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-800 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-rose-900">Erro de Sintaxe no JSON:</p>
            <p className="mt-0.5">{validation.errorMessage}</p>
            {validation.errorLine && (
              <p className="mt-1 font-mono text-[11px] font-bold text-rose-700">
                Ocorreu por volta da Linha {validation.errorLine}, Coluna {validation.errorColumn}.
              </p>
            )}
          </div>
        </div>
      )}

      {validation.isValid && output && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>JSON Válido e Formatado com Sucesso!</span>
        </div>
      )}

      {/* Grid de Entrada x Saída */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor de Entrada */}
        <div className="space-y-2">
          <label htmlFor="json-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            JSON Bruto (Entrada)
          </label>
          <textarea
            id="json-input"
            rows={14}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setValidation({ isValid: true });
            }}
            placeholder="Cole seu código JSON aqui..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 shadow-inner focus:border-blue-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Editor de Saída */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="json-output" className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Resultado Formatado
            </label>
            <CopyButton text={output} size="sm" variant="primary" />
          </div>
          <textarea
            id="json-output"
            rows={14}
            readOnly
            value={output}
            placeholder="O resultado formatado aparecerá aqui..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-emerald-400 placeholder-slate-600 shadow-inner focus:outline-none leading-relaxed select-all"
          />
        </div>
      </div>
    </div>
  );
}
