import React from "react";

interface LogoProps {
  variant?: "light" | "dark" | "blue" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  showSlogan?: boolean;
  className?: string;
}

export function LogoIcon({ className = "h-8 w-8", color = "#2563EB" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Raio Superior Esquerdo */}
      <line x1="8" y1="12" x2="3" y2="9" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      {/* Raio Superior */}
      <line x1="16" y1="6" x2="16" y2="1" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      {/* Raio Superior Direito */}
      <line x1="24" y1="12" x2="29" y2="9" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      {/* Raio Esquerdo */}
      <line x1="6" y1="21" x2="1" y2="21" stroke={color} strokeWidth="3.5" strokeLinecap="round" />

      {/* Cursor / Pointer Principal */}
      <path
        d="M14 10L32 28L23.5 29.5L28.5 41L23 43.5L18 32L11 38.5L14 10Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({
  variant = "light",
  size = "md",
  showSlogan = false,
  className = "",
}: LogoProps) {
  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  const iconColor = variant === "white" ? "#FFFFFF" : "#2563EB";
  const gratisColor =
    variant === "white"
      ? "text-white"
      : variant === "dark"
      ? "text-white"
      : "text-[#0F172A] dark:text-white";
  const crieColor = variant === "white" ? "text-white" : "text-[#2563EB]";

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2.5">
        <LogoIcon className={iconSizes[size]} color={iconColor} />
        <span className={`font-bold tracking-tight ${textSizes[size]}`}>
          <span className={crieColor}>Crie</span>{" "}
          <span className={gratisColor}>Grátis</span>
        </span>
      </div>
      {showSlogan && (
        <span className="text-[11px] sm:text-xs text-[#475569] font-normal mt-0.5">
          Ferramentas gratuitas para criar, converter e resolver.
        </span>
      )}
    </div>
  );
}
