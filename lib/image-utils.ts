export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Loads an HTMLImageElement from a File or Blob.
 */
export function loadImageFromFile(file: File): Promise<{ img: HTMLImageElement; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({ img, width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => reject(new Error("Não foi possível carregar a imagem. Formato inválido ou corrompido."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Erro ao ler o arquivo selecionado."));
    reader.readAsDataURL(file);
  });
}

/**
 * Redimensiona uma imagem utilizando HTML5 Canvas e gera um Blob.
 */
export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  mimeType: string = "image/jpeg",
  quality: number = 0.9
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  const { img } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Não foi possível inicializar o contexto 2D do Canvas.");

  // Desenho com suavização de imagem ativada
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Se for JPG, preenche fundo branco por garantia
  if (mimeType === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Falha ao gerar a imagem redimensionada."));
        const url = URL.createObjectURL(blob);
        resolve({ blob, url, width: targetWidth, height: targetHeight });
      },
      mimeType,
      quality
    );
  });
}

/**
 * Comprime uma imagem ajustando a qualidade no Canvas.
 */
export async function compressImage(
  file: File,
  qualityPercentage: number
): Promise<{ blob: Blob; url: string; originalSize: number; compressedSize: number; savedPercentage: number }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro ao inicializar Canvas.");

  // Garantir fundo branco se o tipo original for JPEG
  const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
  if (isJpeg) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);

  const quality = Math.max(0.05, Math.min(1, qualityPercentage / 100));
  const outputMime = file.type === "image/png" ? "image/jpeg" : file.type || "image/jpeg";

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Falha ao comprimir imagem."));
        const originalSize = file.size;
        const compressedSize = blob.size;
        const savedPercentage = Math.round(((originalSize - compressedSize) / originalSize) * 100);
        const url = URL.createObjectURL(blob);

        resolve({
          blob,
          url,
          originalSize,
          compressedSize,
          savedPercentage: Math.max(0, savedPercentage),
        });
      },
      outputMime,
      quality
    );
  });
}

/**
 * Converte JPG para PNG sem perda.
 */
export async function convertJpgToPng(file: File): Promise<{ blob: Blob; url: string }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro de contexto de Canvas.");

  ctx.drawImage(img, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Falha na conversão para PNG."));
      const url = URL.createObjectURL(blob);
      resolve({ blob, url });
    }, "image/png");
  });
}

/**
 * Converte PNG para JPG com tratamento de fundo transparente.
 */
export async function convertPngToJpg(
  file: File,
  backgroundColor: string = "#FFFFFF",
  qualityPercentage: number = 90
): Promise<{ blob: Blob; url: string }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro no Canvas.");

  // Preenche fundo para tratar transparência
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(img, 0, 0, width, height);

  const quality = Math.max(0.1, Math.min(1, qualityPercentage / 100));

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Falha na conversão para JPG."));
        const url = URL.createObjectURL(blob);
        resolve({ blob, url });
      },
      "image/jpeg",
      quality
    );
  });
}

/**
 * Formata o tamanho do arquivo em bytes para KB ou MB de forma amigável.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
