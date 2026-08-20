import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";
import Logo from "./Logo";
import FooterPixButton from "./FooterPixButton";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#0F172A] text-[#94A3B8]">
      {/* Banner de Privacidade */}
      <div className="border-b border-[#1E293B] bg-[#020617]/50 py-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">100% Client-Side & Privado</p>
              <p className="text-xs text-[#94A3B8]">Seus arquivos e textos são processados inteiramente no seu próprio navegador.</p>
            </div>
          </div>
          <Link
            href="/privacidade"
            className="rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2 text-xs font-semibold text-white hover:border-[#2563EB] hover:bg-[#2563EB] transition-colors shrink-0"
          >
            Saber mais
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Coluna 1: Marca & Apoio Pix */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Logo variant="white" size="md" />
            </Link>
            <p className="text-sm leading-relaxed text-[#94A3B8] max-w-sm">
              Ferramentas online gratuitas para todos.
            </p>

            {/* Bloco de Apoio Voluntário Pix */}
            <div className="pt-2 space-y-2.5 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <Heart className="h-3.5 w-3.5 fill-rose-400" />
                <span>Apoie o projeto</span>
              </div>
              
              <p className="text-xs leading-relaxed text-[#64748B]">
                O Crie Grátis é gratuito para todos. Se alguma ferramenta te ajudou, você pode contribuir voluntariamente para ajudar a manter o projeto, servidores e novas ferramentas.
              </p>

              <FooterPixButton />
            </div>
          </div>

          {/* Coluna 2: Ferramentas Populares */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Populares</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/criar-qr-code" className="hover:text-white transition-colors">Criar QR Code</Link>
              </li>
              <li>
                <Link href="/comprimir-imagem" className="hover:text-white transition-colors">Comprimir Imagem</Link>
              </li>
              <li>
                <Link href="/redimensionar-imagem" className="hover:text-white transition-colors">Redimensionar Imagem</Link>
              </li>
              <li>
                <Link href="/calculadora-de-porcentagem" className="hover:text-white transition-colors">Calculadora %</Link>
              </li>
              <li>
                <Link href="/gerar-senha" className="hover:text-white transition-colors">Gerar Senha Forte</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Categorias */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Categorias</h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/ferramentas/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Institucional */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">Contato</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1E293B] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Crie Grátis. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito para ser simples, rápido e gratuito.
          </p>
        </div>
      </div>
    </footer>
  );
}
