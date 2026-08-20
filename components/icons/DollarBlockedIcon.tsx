import React from "react";

interface DollarBlockedIconProps {
  className?: string;
  size?: number;
}

export default function DollarBlockedIcon({ className = "h-6 w-6", size }: DollarBlockedIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Círculo externo */}
      <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
      
      {/* Cifrão ($) */}
      <path d="M12 6v12" strokeWidth="1.8" />
      <path d="M14.5 9.5C14.5 8.1 13.4 7 12 7H11C9.6 7 8.5 8.1 8.5 9.5C8.5 10.9 9.6 12 11 12H13C14.4 12 15.5 13.1 15.5 14.5C15.5 15.9 14.4 17 13 17H11C9.6 17 8.5 15.9 8.5 14.5" strokeWidth="1.8" />
      
      {/* Linha diagonal de bloqueio */}
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" strokeWidth="2" />
    </svg>
  );
}
