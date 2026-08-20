"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, MessageSquare, Copy, Check, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Sugestão de Nova Ferramenta");
  const [message, setMessage] = useState("");

  const officialEmail = "contato@criegratis.com.br";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Constrói mailto formatado para disparar o aplicativo de e-mail do usuário
    const mailtoSubject = encodeURIComponent(`[CrieGrátis - ${subject}] de ${name}`);
    const mailtoBody = encodeURIComponent(
      `Olá equipe do CrieGrátis,\n\nNome: ${name}\nE-mail de resposta: ${email}\nAssunto: ${subject}\n\nMensagem:\n${message}\n\n--\nEnviado através do site criegratis.com.br`
    );

    const mailtoUrl = `mailto:${officialEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.open(mailtoUrl, "_blank");

    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 px-3.5 py-1 text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8]">
          <MessageSquare className="h-4 w-4" />
          <span>Fale Conosco</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0F172A] dark:text-white sm:text-4xl">
          Contato & Suporte
        </h1>
        <p className="text-base text-[#475569] dark:text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
          Tem alguma dúvida, encontrou um bug ou gostaria de sugerir uma nova ferramenta? Envie sua mensagem!
        </p>
      </div>

      {/* Card de Contato Direto por E-mail */}
      <div className="rounded-3xl border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/50 dark:from-blue-950/30 dark:via-[#1E293B] dark:to-cyan-950/20 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-md shadow-blue-500/20">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8]">
                E-mail Direto Oficial
              </p>
              <a
                href={`mailto:${officialEmail}`}
                className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors font-mono select-all"
              >
                {officialEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] px-3.5 py-2 text-xs font-bold text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-all cursor-pointer shadow-2xs"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#64748B] dark:text-[#94A3B8]" />
                  <span>Copiar E-mail</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${officialEmail}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8] transition-all shadow-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Abrir no E-mail</span>
            </a>
          </div>
        </div>
      </div>

      {/* Formulário de Envio */}
      <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm">
        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#10B981] dark:text-[#34D399] mx-auto border border-emerald-200 dark:border-emerald-900/50">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white">Mensagem Preparada!</h2>
            <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mx-auto leading-relaxed">
              Sua mensagem foi gerada e encaminhada ao seu cliente de e-mail. Você também pode nos escrever diretamente em <strong>{officialEmail}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
              className="mt-4 rounded-xl bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] block">
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3 text-sm text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] block">
                  Seu E-mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3 text-sm text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] block">
                Assunto
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3 text-sm text-[#0F172A] dark:text-white focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
              >
                <option value="Sugestão de Nova Ferramenta">Sugestão de Nova Ferramenta</option>
                <option value="Relato de Bug / Erro">Relato de Bug / Erro</option>
                <option value="Dúvida Geral">Dúvida Geral</option>
                <option value="Parceria / Publicidade">Parceria / Publicidade</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] block">
                Sua Mensagem
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Como podemos te ajudar?"
                className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3 text-sm text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 text-sm font-bold text-white hover:bg-[#1D4ED8] active:scale-[0.99] shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Enviar Mensagem</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
