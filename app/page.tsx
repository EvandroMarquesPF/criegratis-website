import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  LayoutGrid,
  Image as ImageIcon,
  Type,
  Calculator,
  QrCode,
  Code2,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ToolGrid from "@/components/ToolGrid";
import CategoryCard from "@/components/CategoryCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import DollarBlockedIcon from "@/components/icons/DollarBlockedIcon";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12 sm:pb-16 w-full max-w-full overflow-x-clip">
      {/* HERO DA HOMEPAGE */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A]/50 pt-6 pb-12 sm:pt-16 sm:pb-20">
        {/* Detalhes de Fundo Geométricos Suaves */}
        <div className="absolute top-12 right-12 h-64 w-64 rounded-full bg-blue-100/40 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-8 left-12 h-64 w-64 rounded-full bg-cyan-100/40 dark:bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* 1. NO MOBILE É O PRIMEIRO (order-1) / NO DESKTOP É A DIREITA (order-2 lg:col-span-5): Mockup Visual */}
            <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center w-full max-w-full">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Janela / Card Flutuante */}
                <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] shadow-xl shadow-slate-200/50 dark:shadow-black/40">
                  {/* Header da Janela com Controles Mac na Direita */}
                  <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] px-4 sm:px-5 py-3 sm:py-3.5">
                    <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">Crie Grátis Studio</span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                    </div>
                  </div>

                  {/* Grid de Ícones de Categoria */}
                  <div className="p-4 sm:p-8">
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-3 sm:mb-6">
                      <Link
                        href="/ferramentas/imagens"
                        className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-[#2563EB] dark:text-[#38BDF8] hover:scale-105 transition-transform"
                      >
                        <ImageIcon className="h-6 w-6 sm:h-7 sm:w-7 mb-1" />
                        <span className="text-[10px] font-bold">Imagens</span>
                      </Link>

                      <Link
                        href="/ferramentas/texto"
                        className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 text-[#10B981] dark:text-[#34D399] hover:scale-105 transition-transform"
                      >
                        <Type className="h-6 w-6 sm:h-7 sm:w-7 mb-1" />
                        <span className="text-[10px] font-bold">Texto</span>
                      </Link>

                      <Link
                        href="/ferramentas/calculadoras"
                        className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 text-[#F59E0B] dark:text-[#FBBF24] hover:scale-105 transition-transform"
                      >
                        <Calculator className="h-6 w-6 sm:h-7 sm:w-7 mb-1" />
                        <span className="text-[10px] font-bold">Cálculos</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                      <Link
                        href="/ferramentas/qr-code"
                        className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900/50 text-[#06B6D4] dark:text-[#22D3EE] hover:scale-105 transition-transform"
                      >
                        <QrCode className="h-6 w-6 sm:h-7 sm:w-7 mb-1" />
                        <span className="text-[10px] font-bold">QR Code</span>
                      </Link>

                      <Link
                        href="/ferramentas/desenvolvedor"
                        className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-[#8B5CF6] dark:text-[#A78BFA] hover:scale-105 transition-transform"
                      >
                        <Code2 className="h-6 w-6 sm:h-7 sm:w-7 mb-1" />
                        <span className="text-[10px] font-bold">Dev</span>
                      </Link>

                      <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8]">
                        <DollarBlockedIcon className="h-6 w-6 sm:h-7 sm:w-7 mb-1 text-[#2563EB] dark:text-[#38BDF8]" />
                        <span className="text-[10px] font-bold">Grátis</span>
                      </div>
                    </div>
                  </div>

                  {/* Barra de Status */}
                  <div className="border-t border-[#F1F5F9] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] px-4 sm:px-5 py-2.5 sm:py-3 text-center text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">
                    ⚡ Processamento direto no navegador
                  </div>
                </div>
              </div>
            </div>

            {/* 2. NO MOBILE É O SEGUNDO (order-2) / NO DESKTOP É A ESQUERDA (order-1 lg:col-span-7): Texto e Ações */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col space-y-5 sm:space-y-6 text-center lg:text-left">
              {/* Texto H1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white leading-[1.18] sm:leading-[1.15]">
                Ferramentas gratuitas para{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">criar</span>,{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">converter</span> e{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">resolver</span>.
              </h1>

              {/* Texto H2 */}
              <h2 className="text-sm sm:text-lg text-[#475569] dark:text-[#94A3B8] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Tudo o que você precisa, em um só lugar. Rápido, gratuito e 100% no navegador.
              </h2>

              {/* Barra de Busca (Vem antes dos botões no mobile) */}
              <div className="pt-1 max-w-xl mx-auto lg:mx-0 w-full">
                <SearchBar placeholder="Buscar ferramenta..." />
                <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
                  <span className="font-medium text-[#0F172A] dark:text-white">Sugestões:</span>
                  <Link href="/criar-qr-code" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] hover:underline">QR Code</Link>
                  <span>•</span>
                  <Link href="/comprimir-imagem" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] hover:underline">Comprimir Imagem</Link>
                  <span>•</span>
                  <Link href="/gerar-senha" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] hover:underline">Gerar Senha</Link>
                  <span>•</span>
                  <Link href="/calculadora-de-porcentagem" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] hover:underline">Calculadora %</Link>
                </div>
              </div>

              {/* Botões de Ação do Hero (Explorar e Mais usadas) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/ferramentas"
                  className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-6 py-3.5 sm:py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
                >
                  Explorar ferramentas
                </Link>
                <Link
                  href="/#populares"
                  className="inline-flex items-center justify-center rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] px-6 py-3.5 sm:py-3 text-sm font-semibold text-[#0F172A] dark:text-white shadow-2xs hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] hover:border-[#CBD5E1] dark:hover:border-[#475569] active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
                >
                  Mais usadas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-3xl">
            Categorias
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Encontre a ferramenta perfeita organizada por utilidade.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.slug).length;
            return <CategoryCard key={cat.id} category={cat} toolCount={count} />;
          })}
        </div>
      </section>

      {/* FERRAMENTAS MAIS USADAS */}
      <section id="populares" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-3xl">
              Ferramentas Mais Utilizadas
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
              Soluções rápidas e eficientes prontas para uso direto no seu navegador.
            </p>
          </div>
          <Link
            href="/ferramentas"
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:text-[#1D4ED8] dark:hover:text-[#7DD3FC] hover:gap-2 transition-all shrink-0"
          >
            Ver todas as ferramentas ({TOOLS.length})
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ToolGrid tools={TOOLS} />
      </section>

      {/* Publicidade entre seções */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="home-middle" format="horizontal" />
      </div>

      {/* PADRÕES VISUAIS / PILARES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white sm:text-3xl">
              Por que usar o Crie Grátis?
            </h2>
            <p className="mt-2 text-[#475569] dark:text-[#94A3B8] text-xs sm:text-base">
              Desenvolvemos a plataforma com foco em simplicidade, velocidade e privacidade total.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-3 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#10B981] dark:text-[#34D399] border border-emerald-100 dark:border-emerald-900/50">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">Privacidade em 1.º Lugar</h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Suas imagens e dados nunca são enviados para servidores externos. O processamento é 100% feito no seu dispositivo.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8] border border-blue-100 dark:border-blue-900/50">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">Velocidade Instantânea</h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Sem filas de espera, sem carregamentos demorados. Resultados imediatos ao alcance de um clique.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-[#F59E0B] dark:text-[#FBBF24] border border-amber-100 dark:border-amber-900/50">
                <DollarBlockedIcon className="h-6 w-6 sm:h-7 sm:w-7 mb-1 text-[#2563EB] dark:text-[#38BDF8]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">Totalmente Grátis</h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Sem assinaturas, sem marcas d'água e sem necessidade de criar conta ou informar e-mail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
