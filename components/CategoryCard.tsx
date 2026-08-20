import React from "react";
import Link from "next/link";
import { CategoryInfo } from "@/lib/categories";
import { Image, Type, Calculator, Code2, QrCode } from "lucide-react";

const ICON_MAP = {
  Image,
  Type,
  Calculator,
  Code2,
  QrCode,
};

interface CategoryCardProps {
  category: CategoryInfo;
  toolCount?: number;
}

export default function CategoryCard({ category, toolCount }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.iconName] || Image;

  return (
    <Link
      href={`/ferramentas/${category.slug}`}
      className="group flex flex-col items-center justify-center text-center rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 shadow-sm hover:shadow-md hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:-translate-y-0.5 transition-all duration-200"
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.bgColor} dark:bg-opacity-20 ${category.textColor} ${category.borderColor} dark:border-opacity-30 border mb-4 group-hover:scale-105 transition-transform duration-200`}
      >
        <IconComponent className="h-8 w-8" />
      </div>

      <h3 className="text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
        {category.name}
      </h3>

      {typeof toolCount === "number" && (
        <span className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 font-medium">
          {toolCount} {toolCount === 1 ? "ferramenta" : "ferramentas"}
        </span>
      )}
    </Link>
  );
}
