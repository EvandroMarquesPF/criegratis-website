export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  iconName: "Image" | "Type" | "Calculator" | "Code2" | "QrCode";
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "imagens",
    slug: "imagens",
    name: "Imagens",
    iconName: "Image",
    description: "Comprima, redimensione e converta imagens no seu navegador.",
    bgColor: "bg-blue-50",
    textColor: "text-[#2563EB]",
    borderColor: "border-blue-100",
  },
  {
    id: "texto",
    slug: "texto",
    name: "Texto",
    iconName: "Type",
    description: "Ferramentas de análise, contagem e edição de texto em tempo real.",
    bgColor: "bg-emerald-50",
    textColor: "text-[#10B981]",
    borderColor: "border-emerald-100",
  },
  {
    id: "calculadoras",
    slug: "calculadoras",
    name: "Calculadoras",
    iconName: "Calculator",
    description: "Calculadoras matemáticas e utilitários rápidos para o seu dia a dia.",
    bgColor: "bg-amber-50",
    textColor: "text-[#F59E0B]",
    borderColor: "border-amber-100",
  },
  {
    id: "desenvolvedor",
    slug: "desenvolvedor",
    name: "Desenvolvedor",
    iconName: "Code2",
    description: "Utilitários essenciais de formatação, minificação e validação.",
    bgColor: "bg-purple-50",
    textColor: "text-[#8B5CF6]",
    borderColor: "border-purple-100",
  },
  {
    id: "qr-code",
    slug: "qr-code",
    name: "QR Code e Links",
    iconName: "QrCode",
    description: "Gere e personalize QR Codes e links com facilidade e privacidade.",
    bgColor: "bg-cyan-50",
    textColor: "text-[#06B6D4]",
    borderColor: "border-cyan-100",
  },
];
