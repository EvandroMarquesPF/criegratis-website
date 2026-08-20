"use client";

import React, { useState } from "react";
import CopyButton from "@/components/CopyButton";

export default function PercentageCalculatorTool() {
  const [activeTab, setActiveTab] = useState<"direct" | "ratio" | "increase" | "discount">("direct");

  // Tab 1: Quanto é X% de Y?
  const [t1Percent, setT1Percent] = useState<number | "">(15);
  const [t1Value, setT1Value] = useState<number | "">(200);

  // Tab 2: X é qual % de Y?
  const [t2ValX, setT2ValX] = useState<number | "">(30);
  const [t2ValY, setT2ValY] = useState<number | "">(150);

  // Tab 3: Aumento de X para Y
  const [t3Original, setT3Original] = useState<number | "">(100);
  const [t3Final, setT3Final] = useState<number | "">(125);

  // Tab 4: Desconto de X para Y
  const [t4Original, setT4Original] = useState<number | "">(200);
  const [t4Final, setT4Final] = useState<number | "">(150);

  // Cálculos
  const calc1 = () => {
    if (t1Percent === "" || t1Value === "") return null;
    return (Number(t1Percent) / 100) * Number(t1Value);
  };

  const calc2 = () => {
    if (t2ValX === "" || t2ValY === "" || Number(t2ValY) === 0) return null;
    return (Number(t2ValX) / Number(t2ValY)) * 100;
  };

  const calc3 = () => {
    if (t3Original === "" || t3Final === "" || Number(t3Original) === 0) return null;
    const diff = Number(t3Final) - Number(t3Original);
    return (diff / Number(t3Original)) * 100;
  };

  const calc4 = () => {
    if (t4Original === "" || t4Final === "" || Number(t4Original) === 0) return null;
    const diff = Number(t4Original) - Number(t4Final);
    const pct = (diff / Number(t4Original)) * 100;
    return { diff, pct };
  };

  const r1 = calc1();
  const r2 = calc2();
  const r3 = calc3();
  const r4 = calc4();

  return (
    <div className="space-y-6">
      {/* Abas dos Modos (Pílulas) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] dark:border-[#334155] pb-4">
        <button
          onClick={() => setActiveTab("direct")}
          className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "direct"
              ? "bg-[#2563EB] text-white shadow-xs"
              : "border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
          }`}
        >
          Quanto é X% de Y?
        </button>
        <button
          onClick={() => setActiveTab("ratio")}
          className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "ratio"
              ? "bg-[#2563EB] text-white shadow-xs"
              : "border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
          }`}
        >
          X é qual % de Y?
        </button>
        <button
          onClick={() => setActiveTab("increase")}
          className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "increase"
              ? "bg-[#2563EB] text-white shadow-xs"
              : "border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
          }`}
        >
          Aumento % (+%)
        </button>
        <button
          onClick={() => setActiveTab("discount")}
          className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "discount"
              ? "bg-[#2563EB] text-white shadow-xs"
              : "border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
          }`}
        >
          Desconto % (-%)
        </button>
      </div>

      {/* Conteúdo da Aba 1: Quanto é X% de Y? */}
      {activeTab === "direct" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white">
            <span>Quanto é</span>
            <input
              type="number"
              value={t1Percent}
              onChange={(e) => setT1Percent(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-24 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 text-center text-[#2563EB] dark:text-[#38BDF8] font-bold focus:border-[#2563EB] focus:outline-none"
            />
            <span>% de</span>
            <input
              type="number"
              value={t1Value}
              onChange={(e) => setT1Value(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-32 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 text-center text-[#0F172A] dark:text-white font-bold focus:border-[#2563EB] focus:outline-none"
            />
            <span>?</span>
          </div>

          <div className="rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8]">Resultado</p>
              <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white mt-1">
                {r1 !== null ? r1.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) : "---"}
              </p>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Fórmula: ({t1Percent || 0} / 100) × {t1Value || 0}
              </p>
            </div>
            <CopyButton text={r1 !== null ? r1.toString() : ""} size="md" />
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 2: X é qual % de Y? */}
      {activeTab === "ratio" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white">
            <span>O valor</span>
            <input
              type="number"
              value={t2ValX}
              onChange={(e) => setT2ValX(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-28 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 text-center text-[#2563EB] dark:text-[#38BDF8] font-bold focus:border-[#2563EB] focus:outline-none"
            />
            <span>é qual porcentagem de</span>
            <input
              type="number"
              value={t2ValY}
              onChange={(e) => setT2ValY(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-32 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 text-center text-[#0F172A] dark:text-white font-bold focus:border-[#2563EB] focus:outline-none"
            />
            <span>?</span>
          </div>

          <div className="rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8]">Porcentagem Correspondente</p>
              <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white mt-1">
                {r2 !== null ? `${r2.toFixed(2)}%` : "---"}
              </p>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Fórmula: ({t2ValX || 0} / {t2ValY || 1}) × 100
              </p>
            </div>
            <CopyButton text={r2 !== null ? `${r2.toFixed(2)}%` : ""} size="md" />
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 3: Aumento % */}
      {activeTab === "increase" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white">
            <span>Um valor subiu de</span>
            <input
              type="number"
              value={t3Original}
              onChange={(e) => setT3Original(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-28 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 text-center text-[#0F172A] dark:text-white font-bold focus:border-[#2563EB] focus:outline-none"
            />
            <span>para</span>
            <input
              type="number"
              value={t3Final}
              onChange={(e) => setT3Final(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-28 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 text-center text-[#10B981] dark:text-[#34D399] font-bold focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-[#ECFDF5]/60 dark:bg-emerald-950/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#10B981] dark:text-[#34D399]">Aumento Percentual</p>
              <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white mt-1">
                {r3 !== null ? `+${r3.toFixed(2)}%` : "---"}
              </p>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Diferença absoluta: {t3Final && t3Original ? (Number(t3Final) - Number(t3Original)).toFixed(2) : 0}
              </p>
            </div>
            <CopyButton text={r3 !== null ? `+${r3.toFixed(2)}%` : ""} size="md" />
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 4: Desconto % */}
      {activeTab === "discount" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white">
            <span>Um valor caiu de</span>
            <input
              type="number"
              value={t4Original}
              onChange={(e) => setT4Original(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-28 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 text-center text-[#0F172A] dark:text-white font-bold focus:border-[#2563EB] focus:outline-none"
            />
            <span>para</span>
            <input
              type="number"
              value={t4Final}
              onChange={(e) => setT4Final(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-28 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 text-center text-[#EF4444] dark:text-[#F87171] font-bold focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-[#FEF2F2]/60 dark:bg-rose-950/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#EF4444] dark:text-[#F87171]">Desconto Concedido</p>
              <p className="text-3xl font-extrabold text-[#0F172A] dark:text-white mt-1">
                {r4 !== null ? `-${r4.pct.toFixed(2)}%` : "---"}
              </p>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Economia de: R$ {r4 !== null ? r4.diff.toFixed(2) : "0.00"}
              </p>
            </div>
            <CopyButton text={r4 !== null ? `-${r4.pct.toFixed(2)}%` : ""} size="md" />
          </div>
        </div>
      )}
    </div>
  );
}
