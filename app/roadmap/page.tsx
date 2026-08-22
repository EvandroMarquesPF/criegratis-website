import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Map,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Heart,
  MessageSquarePlus,
  ShieldCheck,
  Zap,
  Wrench,
  Search,
} from "lucide-react";
import RoadmapView from "./RoadmapView";

export const metadata: Metadata = {
  title: "Roadmap de Ferramentas — Rumo às 100 Ferramentas | CrieGrátis",
  description:
    "Acompanhe o desenvolvimento do CrieGrátis. Veja o que já lançamos, o que está sendo construído agora e as próximas ferramentas que chegarão à plataforma.",
  openGraph: {
    title: "Roadmap CrieGrátis — As Próximas 100 Ferramentas",
    description:
      "Acompanhe as próximas ferramentas gratuitas, rápidas e 100% client-side que estamos construindo.",
    url: "https://criegratis.com.br/roadmap",
  },
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8]">
          <Map className="h-4 w-4" />
          <span>Evolução Contínua</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0F172A] dark:text-white sm:text-4xl lg:text-5xl tracking-tight">
          Roadmap do <span className="text-[#2563EB] dark:text-[#38BDF8]">CrieGrátis</span>
        </h1>
        <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
          Nossa meta é construir o ecossistema definitivo de <strong>100 utilitários gratuitos</strong>, 
          rápidos e com processamento <strong>100% privado no seu navegador</strong>.
        </p>

        {/* Resumo em Números */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#1E293B]/70 p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Disponíveis</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">10</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">100% funcionais</p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#1E293B]/70 p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Em Produção</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">10</p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Fase 2 (v1.1)</p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#1E293B]/70 p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Planejadas</span>
              <Sparkles className="h-4 w-4 text-[#2563EB] dark:text-[#38BDF8]" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">80</p>
            <p className="text-[11px] text-[#2563EB] dark:text-[#38BDF8] font-medium">No pipeline</p>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#1E293B]/70 p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Meta Final</span>
              <Wrench className="h-4 w-4 text-purple-500" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">100</p>
            <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">Ferramentas grátis</p>
          </div>
        </div>
      </div>

      {/* Componente Interativo de Visualização do Roadmap (Filtros, Busca e Fases) */}
      <RoadmapView />

      {/* Seção de Contribuição / Sugestão */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* Card de Sugestão de Ferramenta */}
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#1E293B] dark:to-[#0F172A] p-7 shadow-sm space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#38BDF8] border border-blue-100 dark:border-blue-900/50">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">
            Tem ideia de uma ferramenta útil?
          </h2>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            Priorizamos o desenvolvimento com base nas necessidades reais da comunidade. Se você precisa de um conversor, calculadora ou utilitário específico, envie sua sugestão!
          </p>
          <div className="pt-2">
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#38BDF8] dark:hover:bg-[#0284C7] dark:text-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition-colors shadow-sm"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>Sugerir Nova Ferramenta</span>
            </Link>
          </div>
        </div>

        {/* Card de Apoio ao Desenvolvimento */}
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-gradient-to-br from-white to-[#F8FAFC] dark:from-[#1E293B] dark:to-[#0F172A] p-7 shadow-sm space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 border border-rose-100 dark:border-rose-900/50">
            <Heart className="h-6 w-6 fill-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">
            Apoie o Projeto CrieGrátis
          </h2>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            O CrieGrátis é mantido de forma independente, sem anúncios invasivos e sem cobrar assinaturas. Contribuições voluntárias via Pix ajudam a acelerar a chegada às 100 ferramentas.
          </p>
          <div className="pt-2">
            <a
              href="mailto:pix@criegratis.com.br"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:bg-[#F8FAFC] dark:hover:bg-[#334155] px-5 py-3 text-sm font-semibold text-[#0F172A] dark:text-white transition-colors shadow-2xs font-mono"
            >
              <span>Chave Pix: pix@criegratis.com.br</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
