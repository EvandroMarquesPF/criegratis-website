import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, CheckCircle2, HelpCircle } from "lucide-react";
import { ToolInfo } from "@/lib/tools";
import RelatedTools from "./RelatedTools";
import AdPlaceholder from "./AdPlaceholder";

interface ToolLayoutProps {
  tool: ToolInfo;
  children: React.ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] pb-16 transition-colors duration-200">
      {/* Container Principal */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8] mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors">
            Início
          </Link>
          <ChevronRight className="h-3 w-3 text-[#94A3B8] shrink-0" />
          <Link href="/ferramentas" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors">
            Ferramentas
          </Link>
          <ChevronRight className="h-3 w-3 text-[#94A3B8] shrink-0" />
          <Link
            href={`/ferramentas/${tool.category}`}
            className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors capitalize"
          >
            {tool.category.replace("-", " ")}
          </Link>
          <ChevronRight className="h-3 w-3 text-[#94A3B8] shrink-0" />
          <span className="font-semibold text-[#0F172A] dark:text-white">{tool.name}</span>
        </nav>

        {/* Header da Ferramenta */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 px-3 py-1 text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8] mb-3">
            <span className="capitalize">{tool.category.replace("-", " ")}</span>
            <span>•</span>
            <span>100% Grátis & no Navegador</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-4xl">
            {tool.h1}
          </h1>
          <p className="mt-3 text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-3xl">
            {tool.fullDescription}
          </p>
        </div>

        {/* Widget Interativo da Ferramenta */}
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm">
          {children}
        </div>

        {/* Publicidade topo do conteúdo */}
        <AdPlaceholder slot="top-tool" format="horizontal" />

        {/* Conteúdo Informativo & SEO On-Page */}
        <div className="mt-12 space-y-8 text-[#0F172A] dark:text-[#F1F5F9]">
          {/* Como Usar */}
          {tool.usageSteps && tool.usageSteps.length > 0 && (
            <section className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-white sm:text-2xl mb-6">
                Como usar a ferramenta {tool.name}
              </h2>
              <ol className="space-y-4">
                {tool.usageSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2563EB] dark:bg-[#38BDF8] text-xs font-bold text-white dark:text-[#0F172A]">
                      {idx + 1}
                    </span>
                    <p className="text-sm sm:text-base leading-relaxed text-[#475569] dark:text-[#94A3B8] pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Recursos Principais */}
          {tool.features && tool.features.length > 0 && (
            <section className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-white sm:text-2xl mb-6">
                Recursos Principais
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tool.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[#475569] dark:text-[#94A3B8]">{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Garantia de Privacidade */}
          <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-[#ECFDF5]/60 dark:bg-emerald-950/20 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#10B981] text-white shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#065F46] dark:text-[#34D399]">
                  Garantia de Privacidade Crie Grátis
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#047857] dark:text-[#A7F3D0]">
                  Seus arquivos e dados são processados diretamente no seu próprio navegador e não precisam ser enviados para nossos servidores. Garantimos total confidencialidade, velocidade e segurança nas suas conversões.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Accordion */}
          {tool.faqs && tool.faqs.length > 0 && (
            <section className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="h-6 w-6 text-[#2563EB] dark:text-[#38BDF8]" />
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white sm:text-2xl">
                  Perguntas Frequentes (FAQ)
                </h2>
              </div>
              <div className="space-y-4 divide-y divide-[#F1F5F9] dark:divide-[#334155]">
                {tool.faqs.map((faq, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-4" : ""}>
                    <h3 className="text-base font-semibold text-[#0F172A] dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Publicidade rodape do conteúdo */}
        <AdPlaceholder slot="bottom-tool" format="horizontal" />

        {/* Ferramentas Relacionadas */}
        <RelatedTools currentSlug={tool.slug} category={tool.category} />
      </div>
    </div>
  );
}
