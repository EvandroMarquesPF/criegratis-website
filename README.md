# Crie Grátis — MVP v1.0

Plataforma de ferramentas gratuitas para criar, converter, calcular, editar e resolver tarefas do dia a dia diretamente no navegador, com foco total em **SEO, velocidade, acessibilidade e privacidade (100% client-side)**.

Domínio Planejado: **[criegratis.com.br](https://criegratis.com.br)**

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4 + @tailwindcss/typography
- **Ícones**: Lucide React (`lucide-react`)
- **Processamento Client-Side**: HTML5 Canvas API (imagens), `qrcode` (QR Code)
- **Qualidade de Código**: ESLint & Prettier
- **Gerenciador de Pacotes**: npm

---

## ⚡ 10 Ferramentas Incluídas no MVP

| Ferramenta | URL | Categoria | Descrição |
| :--- | :--- | :--- | :--- |
| **Gerador de QR Code** | `/criar-qr-code` | QR Code e Links | Cria QR Codes instantâneos em PNG a partir de links ou textos. |
| **Gerador de Senha** | `/gerar-senha` | Desenvolvedor | Senhas aleatórias seguras com medidor de força e caracteres configuráveis. |
| **Contador de Palavras** | `/contador-de-palavras` | Texto | Contagem em tempo real de palavras, caracteres, linhas e tempo de leitura. |
| **Contador de Caracteres** | `/contador-de-caracteres` | Texto | Verificador de limite de caracteres para Twitter/X, Instagram e SEO. |
| **Calculadora de Porcentagem** | `/calculadora-de-porcentagem` | Calculadoras | 4 modos de cálculo: X% de Y, proporção %, aumento % e desconto %. |
| **Redimensionar Imagem** | `/redimensionar-imagem` | Imagens | Altera largura e altura em pixels mantendo a proporção (JPG, PNG, WebP). |
| **Comprimir Imagem** | `/comprimir-imagem` | Imagens | Otimiza o peso (KB/MB) de imagens com controle de qualidade no browser. |
| **Converter JPG para PNG** | `/jpg-para-png` | Imagens | Conversão limpa e sem perda de qualidade direto no Canvas HTML5. |
| **Converter PNG para JPG** | `/png-para-jpg` | Imagens | Conversão para JPG com preenchimento de fundo transparente (branco/custom). |
| **Formatador e Validador JSON** | `/formatar-json` | Desenvolvedor | Identação, minificação e validador de sintaxe JSON com indicador de linha de erro. |

---

## 🚀 Como Executar Localmente

### 1. Clonar ou Acessar o Repositório

```bash
git clone <seu-repositorio>
cd criegratis
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 4. Testar o Build de Produção

```bash
npm run build
npm start
```

---

## ➕ Como Adicionar uma Nova Ferramenta

A arquitetura do CrieGrátis foi projetada para expansão contínua sem duplicação de código:

1. **Cadastrar os Metadados da Ferramenta em `lib/tools.ts`**:
   Adicione um novo objeto na lista `TOOLS` com `slug`, `name`, `shortDescription`, `category`, `keywords`, `usageSteps`, `faqs`, etc.

2. **Criar o Widget Interativo em `components/tools/NovaFerramentaTool.tsx`**:
   Construa o componente React utilizando estado local e processamento no navegador.

3. **Criar a Rota Next.js em `app/nova-ferramenta/page.tsx`**:
   Importe o `ToolLayout` e o seu widget. O sitemap (`/sitemap.xml`) e as ferramentas relacionadas serão atualizados automaticamente!

---

## 🌐 Deploy na Vercel

1. Suba o código para um repositório no **GitHub**.
2. Acesse o painel da **Vercel** e clique em **Add New Project**.
3. Importe o repositório `criegratis`.
4. Configure as Variáveis de Ambiente se necessário (`NEXT_PUBLIC_SITE_URL=https://criegratis.com.br`).
5. Clique em **Deploy**.
6. No painel da Vercel, acesse **Settings → Domains** e adicione o domínio customizado `criegratis.com.br`.

---

## 🔒 Princípio de Privacidade & Sustentabilidade

- **100% Client-Side**: Todas as ferramentas de processamento de imagem, QR Code, texto e JSON operam diretamente no navegador do usuário. Nenhum arquivo ou dado é enviado para servidores externos.
- **Zero Anúncios**: A plataforma é 100% livre de publicidade invasiva ou rastreadores, sendo mantida exclusivamente com recursos próprios e apoio voluntário da comunidade via Pix (`pix@criegratis.com.br`).
- **Contato Oficial**: Dúvidas, sugestões e suporte em `contato@criegratis.com.br`.

