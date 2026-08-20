export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolInfo {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: "imagens" | "calculadoras" | "texto" | "desenvolvedor" | "qr-code";
  keywords: string[];
  icon: string; // Lucide icon identifier
  href: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  badge?: string;
  usageSteps: string[];
  features: string[];
  faqs: FAQItem[];
  isPopular?: boolean;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "criar-qr-code",
    name: "Gerador de QR Code",
    shortDescription: "Crie QR Codes grátis para sites, redes sociais ou textos rapidamente.",
    fullDescription: "Ferramenta gratuita para criar QR Code instantaneamente. Digite um link ou texto e baixe seu QR Code em alta definição no formato PNG sem precisar de cadastro.",
    category: "qr-code",
    keywords: ["criar qr code", "gerar qr code", "qr code gratis", "gerador de qr code", "qr code png"],
    icon: "QrCode",
    href: "/criar-qr-code",
    metaTitle: "Criar QR Code Grátis | CrieGrátis",
    metaDescription: "Crie QR Codes grátis. Gere QR Code para links, textos e informações rapidamente, sem instalar programas.",
    h1: "Criar QR Code Grátis",
    badge: "Popular",
    isPopular: true,
    usageSteps: [
      "Cole ou digite a URL, link ou texto no campo indicado.",
      "O QR Code é gerado instantaneamente no seu navegador.",
      "Clique no botão 'Baixar PNG' para salvar a imagem ou em 'Copiar' para colar onde quiser."
    ],
    features: [
      "Geração 100% instantânea no navegador",
      "Suporte a links HTTP/HTTPS, e-mails, Wi-Fi e textos",
      "Download em imagem PNG cristalina de alta resolução",
      "Garantia total de privacidade (dados não são salvos em servidor)"
    ],
    faqs: [
      {
        question: "O QR Code gerado possui data de validade?",
        answer: "Não! Os QR Codes estáticos gerados no CrieGrátis nunca expiram e continuam funcionando por tempo indeterminado."
      },
      {
        question: "Preciso pagar ou me cadastrar para baixar o QR Code?",
        answer: "Não. A ferramenta é 100% gratuita e livre de cadastro ou limites de download."
      },
      {
        question: "Meus dados ou links são armazenados em algum servidor?",
        answer: "Não. O QR Code é gerado inteiramente no seu próprio navegador utilizando tecnologia client-side."
      }
    ]
  },
  {
    slug: "gerar-senha",
    name: "Gerador de Senha Forte",
    shortDescription: "Gere senhas aleatórias e ultra seguras com tamanho e caracteres customizáveis.",
    fullDescription: "Crie senhas fortes e aleatórias para proteger suas contas. Personalize a quantidade de caracteres, símbolos, números e letras com indicador visual de segurança.",
    category: "desenvolvedor",
    keywords: ["gerar senha", "gerador de senha forte", "criar senha segura", "gerador de senhas aleatorias"],
    icon: "KeyRound",
    href: "/gerar-senha",
    metaTitle: "Gerador de Senha Forte e Segura | CrieGrátis",
    metaDescription: "Gere senhas fortes, aleatórias e seguras. Personalize tamanho, caracteres especiais e números com proteção 100% no navegador.",
    h1: "Gerador de Senha Forte e Segura",
    isPopular: true,
    usageSteps: [
      "Defina o tamanho desejado para a sua senha (de 4 a 64 caracteres).",
      "Marque as opções de caracteres: letras maiúsculas, minúsculas, números e símbolos.",
      "Veja o indicador visual de força da senha e clique no botão 'Copiar' para utilizá-la."
    ],
    features: [
      "Geração criptograficamente segura usando a API nativa do navegador",
      "Indicador em tempo real de força da senha (Fraca, Média, Forte, Muito Forte)",
      "Opção de regerar a senha com um único clique",
      "Nenhuma senha é armazenada ou transmitida pela internet"
    ],
    faqs: [
      {
        question: "Como esta ferramenta garante a segurança das minhas senhas?",
        answer: "Utilizamos a API 'crypto.getRandomValues' nativa dos navegadores modernos, garantindo aleatoriedade verdadeira. Suas senhas nunca saem da memória do seu dispositivo."
      },
      {
        question: "Qual o tamanho ideal para uma senha considerada forte?",
        answer: "Recomendamos senhas de no mínimo 12 a 16 caracteres contendo uma combinação de letras maiúsculas, minúsculas, números e símbolos especiais."
      }
    ]
  },
  {
    slug: "contador-de-palavras",
    name: "Contador de Palavras",
    shortDescription: "Conte palavras, caracteres e linhas do seu texto em tempo real.",
    fullDescription: "Ferramenta essencial para redatores, estudantes e profissionais. Conte palavras, caracteres com e sem espaços, linhas e estime o tempo de leitura do seu texto.",
    category: "texto",
    keywords: ["contador de palavras", "contar palavras", "quantas palavras tem o texto", "contador texto"],
    icon: "FileText",
    href: "/contador-de-palavras",
    metaTitle: "Contador de Palavras e Caracteres | CrieGrátis",
    metaDescription: "Conte palavras, caracteres totais, caracteres sem espaço e linhas do seu texto em tempo real. Grátis, rápido e preciso.",
    h1: "Contador de Palavras e Linhas",
    isPopular: true,
    usageSteps: [
      "Cole ou digite o texto na caixa de entrada principal.",
      "Acompanhe as métricas atualizadas instantaneamente em tempo real.",
      "Utilize os botões de copiar ou limpar para gerenciar o conteúdo."
    ],
    features: [
      "Contagem exata de palavras, caracteres totais e sem espaços",
      "Estimativa inteligente de tempo de leitura e tempo de fala",
      "Contagem de linhas e parágrafos",
      "Atualização instantânea enquanto você digita"
    ],
    faqs: [
      {
        question: "Existe limite de tamanho para a contagem do texto?",
        answer: "Não! Você pode colar artigos longos, TCCs ou livros inteiros que o contador processará instantaneamente no seu dispositivo."
      }
    ]
  },
  {
    slug: "contador-de-caracteres",
    name: "Contador de Caracteres",
    shortDescription: "Verifique o limite de caracteres para redes sociais (Twitter/X, Instagram, LinkedIn).",
    fullDescription: "Evite passar do limite em publicações do Twitter/X, Instagram, LinkedIn e títulos de SEO. Defina um limite personalizado com alerta visual intuitivo.",
    category: "texto",
    keywords: ["contador de caracteres", "limite de caracteres twitter", "caracteres instagram", "contar caracteres"],
    icon: "AlignLeft",
    href: "/contador-de-caracteres",
    metaTitle: "Contador de Caracteres com Limite Configurável | CrieGrátis",
    metaDescription: "Contador de caracteres ideal para redes sociais e SEO. Configure limites para Twitter/X, Instagram, Meta Ads e acompanhe em tempo real.",
    h1: "Contador de Caracteres",
    usageSteps: [
      "Digite ou cole o texto no campo de edição.",
      "Selecione um preset de rede social (ex: Twitter 280 caracteres) ou defina seu próprio limite.",
      "Observe a barra visual de progresso e o saldo de caracteres restantes."
    ],
    features: [
      "Presets para Twitter/X (280 chars), Instagram Bio (150 chars), SEO Title (60 chars) e Meta Description (160 chars)",
      "Barra visual de progresso com mudança de cor (Verde, Amarelo, Vermelho)",
      "Cópia rápida com um único clique"
    ],
    faqs: [
      {
        question: "Os espaços contam como caracteres?",
        answer: "Sim! Na contagem padrão de redes sociais os espaços são contabilizados. No entanto, nossa ferramenta exibe tanto a contagem com quanto sem espaços."
      }
    ]
  },
  {
    slug: "calculadora-de-porcentagem",
    name: "Calculadora de Porcentagem",
    shortDescription: "Calcule X% de um valor, diferença percentual, aumentos e descontos rapidamente.",
    fullDescription: "Resolva qualquer cálculo de porcentagem de forma simples. Calcule porcentagem de um número, porcentagem entre dois valores, acréscimos e descontos com resultado instantâneo.",
    category: "calculadoras",
    keywords: ["calculadora de porcentagem", "calcular porcentagem", "como calcular porcentagem", "desconto percentual", "porcentagem de um valor"],
    icon: "Percent",
    href: "/calculadora-de-porcentagem",
    metaTitle: "Calculadora de Porcentagem Fácil e Rápida | CrieGrátis",
    metaDescription: "Calcule porcentagem de um valor, aumento, desconto e variação percentual entre dois números sem complicações.",
    h1: "Calculadora de Porcentagem",
    badge: "Essencial",
    isPopular: true,
    usageSteps: [
      "Escolha o tipo de cálculo percentual que deseja realizar.",
      "Informe os valores nos campos numéricos.",
      "O resultado exato e a fórmula explicativa aparecem na mesma hora."
    ],
    features: [
      "Quanto é X% de Y (Cálculo direto)",
      "O valor X representa qual porcentagem de Y? (Proporção)",
      "Aumento percentual de X para Y (+%)",
      "Desconto/redução percentual de X para Y (-%)"
    ],
    faqs: [
      {
        question: "Como funciona o cálculo de desconto percentual?",
        answer: "Informando o valor original e o valor final ou a taxa de desconto, nossa calculadora exibe quanto você economizou em reais e em porcentagem."
      }
    ]
  },
  {
    slug: "redimensionar-imagem",
    name: "Redimensionar Imagem",
    shortDescription: "Altere a largura e altura de fotos JPG, PNG e WebP mantendo a proporção.",
    fullDescription: "Redimensione imagens sem perder qualidade. Ajuste dimensões em pixels, escolha se quer travar a proporção e baixe a nova imagem em poucos segundos.",
    category: "imagens",
    keywords: ["redimensionar imagem", "mudar tamanho de foto", "redimensionar jpg", "alterar dimensoes imagem"],
    icon: "Scaling",
    href: "/redimensionar-imagem",
    metaTitle: "Redimensionar Imagem Grátis | CrieGrátis",
    metaDescription: "Redimensione fotos e imagens JPG, PNG e WebP. Ajuste largura e altura em pixels no seu navegador com total privacidade.",
    h1: "Redimensionar Imagem",
    isPopular: true,
    usageSteps: [
      "Faça o upload ou arraste sua imagem (JPG, PNG ou WebP) para a área de soltura.",
      "Insira as novas dimensões de largura ou altura em pixels.",
      "Marque a opção 'Manter proporção' se deseja evitar distorção.",
      "Clique em 'Redimensionar e Baixar'."
    ],
    features: [
      "Processamento 100% no navegador via Canvas HTML5",
      "Trava de proporção automática inteligente",
      "Suporte aos formatos populares: JPG, PNG, WebP",
      "Sem limitações de tamanho ou marcas d'água"
    ],
    faqs: [
      {
        question: "A imagem perde qualidade ao ser redimensionada?",
        answer: "Reduzir o tamanho da imagem mantém a nitidez perfeita. Ao aumentar além do tamanho original, a imagem pode apresentar suavização natural do navegador."
      }
    ]
  },
  {
    slug: "comprimir-imagem",
    name: "Comprimir Imagem",
    shortDescription: "Reduza o tamanho em KB/MB de fotos mantendo excelente qualidade visual.",
    fullDescription: "Otimize suas fotos para o site, blog ou e-mail. Diminua o peso dos arquivos de imagem diretamente no navegador sem enviar nenhum arquivo para servidores externos.",
    category: "imagens",
    keywords: ["comprimir imagem", "diminuir peso foto", "otimizar imagem", "compressor de imagem gratis"],
    icon: "Minimize2",
    href: "/comprimir-imagem",
    metaTitle: "Comprimir Imagem Grátis | CrieGrátis",
    metaDescription: "Comprima fotos e imagens JPG, PNG e WebP mantendo a qualidade. Reduza o peso dos seus arquivos rapidamente no navegador.",
    h1: "Comprimir Imagem Grátis",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Arraste ou selecione a imagem que deseja comprimir.",
      "Ajuste o slider de qualidade visual conforme sua preferência.",
      "Compare o tamanho original com o tamanho comprimido e o percentual de redução.",
      "Baixe o arquivo otimizado."
    ],
    features: [
      "Redução expressiva do tamanho do arquivo (até 80% menor)",
      "Comparador em tempo real de peso original vs peso comprimido",
      "Sem envio de fotos para servidores (privacidade máxima)",
      "Download instantâneo sem filas de espera"
    ],
    faqs: [
      {
        question: "Por que comprimir imagens no meu navegador é mais seguro?",
        answer: "Porque suas fotos pessoais ou profissionais nunca trafegam pela internet. Todo o processamento matemático de compressão ocorre no chip do seu próprio computador ou celular."
      }
    ]
  },
  {
    slug: "jpg-para-png",
    name: "Converter JPG para PNG",
    shortDescription: "Converta fotos JPG/JPEG em imagens PNG sem perda de qualidade.",
    fullDescription: "Transforme imagens no formato JPG/JPEG para PNG em um clique. Ideal para garantir compatibilidade com sistemas que exigem o formato PNG.",
    category: "imagens",
    keywords: ["jpg para png", "converter jpg em png", "transformar foto em png", "conversor jpg png"],
    icon: "Image",
    href: "/jpg-para-png",
    metaTitle: "Converter JPG para PNG Grátis | CrieGrátis",
    metaDescription: "Conversor JPG para PNG grátis. Transforme fotos JPEG em PNG instantaneamente no seu navegador sem instalar software.",
    h1: "Converter JPG para PNG",
    usageSteps: [
      "Selecione ou arraste o arquivo JPG/JPEG para o conversor.",
      "O preview da conversão é exibido na tela.",
      "Clique no botão 'Baixar PNG' para obter a imagem convertida."
    ],
    features: [
      "Conversão limpa e sem perda de nitidez",
      "Processamento ultra-rápido em milissegundos",
      "100% gratuito e ilimitado"
    ],
    faqs: [
      {
        question: "Qual a diferença entre JPG e PNG?",
        answer: "O formato JPG utiliza compressão com perdas leve e é ideal para fotografias. O PNG utiliza compressão sem perdas e suporta fundos transparentes."
      }
    ]
  },
  {
    slug: "png-para-jpg",
    name: "Converter PNG para JPG",
    shortDescription: "Converta imagens PNG em JPG com fundo branco ou colorido personalizável.",
    fullDescription: "Converta arquivos PNG em JPG para diminuir o tamanho ou atender requisitos de envio. Inclui tratamento de transparência com fundo branco ou customizável.",
    category: "imagens",
    keywords: ["png para jpg", "converter png em jpg", "transformar png para jpg", "conversor de imagem"],
    icon: "FileImage",
    href: "/png-para-jpg",
    metaTitle: "Converter PNG para JPG Grátis | CrieGrátis",
    metaDescription: "Converta imagens PNG para JPG com controle de qualidade e preenchimento de fundo transparente. Rápido e gratuito.",
    h1: "Converter PNG para JPG",
    usageSteps: [
      "Faça o upload do seu arquivo PNG.",
      "Se a imagem tiver transparência, escolha a cor de fundo (padrão é branco).",
      "Ajuste a qualidade final se desejado e clique em 'Baixar JPG'."
    ],
    features: [
      "Tratamento automático e perfeito de transparência PNG",
      "Opção de escolher a cor de fundo para a área transparente",
      "Controle de qualidade do arquivo JPG final"
    ],
    faqs: [
      {
        question: "O que acontece com as partes transparentes do PNG?",
        answer: "Como o formato JPG não suporta transparência, a nossa ferramenta preenche a área transparente com uma cor de sua escolha (por padrão, cor branca pura)."
      }
    ]
  },
  {
    slug: "formatar-json",
    name: "Formatador e Validador JSON",
    shortDescription: "Formate, idente, minifique e valide códigos JSON com detecção de erros.",
    fullDescription: "Utilitário completo para desenvolvedores. Formate estruturas JSON bagunçadas com indentação limpa (2 ou 4 espaços), minifique para produção e encontre erros de sintaxe rapidamente.",
    category: "desenvolvedor",
    keywords: ["formatar json", "json formatter", "validar json", "json minifier", "identar json"],
    icon: "Code",
    href: "/formatar-json",
    metaTitle: "Formatador e Validador JSON | CrieGrátis",
    metaDescription: "Formate, valide e minifique seu código JSON. Detecte erros de sintaxe amigáveis com indicação exata de linha e posição.",
    h1: "Formatador e Validador JSON",
    badge: "Dev",
    isPopular: true,
    usageSteps: [
      "Cole o seu texto JSON bruto na caixa de edição da esquerda.",
      "Escolha entre 'Formatar (2 Espaços)', 'Formatar (4 Espaços)' ou 'Minificar'.",
      "Se houver erros de sintaxe, uma mensagem destacada indicará o ponto exato da falha.",
      "Copie o resultado limpo com um único clique."
    ],
    features: [
      "Validação estrita de sintaxe JSON com mensageria de erro amigável",
      "Opção de formatação legível (Beautify) ou minificação compacta (Minify)",
      "Botão de carregar exemplo de teste rápido e botão de limpar",
      "Funciona totalmente offline/client-side (privacidade para suas APIs e tokens)"
    ],
    faqs: [
      {
        question: "Meus dados de JSON ou tokens de API são enviados para algum servidor?",
        answer: "Jamais! Todo a análise de sintaxe e formatação é feita usando o motor JavaScript interno do seu próprio navegador."
      }
    ]
  }
];

export function getToolBySlug(slug: string): ToolInfo | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolInfo[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function searchTools(query: string): ToolInfo[] {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;

  return TOOLS.filter((tool) => {
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });
}
