export interface JsonValidationResult {
  isValid: boolean;
  formatted?: string;
  errorMessage?: string;
  errorLine?: number;
  errorColumn?: number;
}

/**
 * Formata um código JSON bruto para exibição amigável ou minificada.
 */
export function formatJson(input: string, indent: number = 2): JsonValidationResult {
  if (!input.trim()) {
    return { isValid: true, formatted: "" };
  }

  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indent);
    return { isValid: true, formatted };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Sintaxe JSON inválida";
    const posMatch = message.match(/position (\d+)/i) || message.match(/at position (\d+)/i);

    let errorLine: number | undefined;
    let errorColumn: number | undefined;

    if (posMatch && posMatch[1]) {
      const position = parseInt(posMatch[1], 10);
      const lines = input.substring(0, position).split("\n");
      errorLine = lines.length;
      errorColumn = lines[lines.length - 1].length + 1;
    }

    return {
      isValid: false,
      errorMessage: message,
      errorLine,
      errorColumn,
    };
  }
}

/**
 * Minifica um texto JSON removendo espaços desnecessários e quebras de linha.
 */
export function minifyJson(input: string): JsonValidationResult {
  return formatJson(input, 0);
}
