const MAX_FILES = 50;

const MAX_SIZE_MB = 15;

const MIN_WIDTH = 800;

const MIN_HEIGHT = 600;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = reject;

    image.src = URL.createObjectURL(file);
  });
}

export async function validateFiles(
  files: File[]
): Promise<void> {

  if (files.length === 0) {
    throw new Error(
      "Selecione ao menos uma fotografia."
    );
  }

  if (files.length > MAX_FILES) {
    throw new Error(
      `É permitido enviar no máximo ${MAX_FILES} fotografias por vez.`
    );
  }

  for (const file of files) {

    if (!file.type.startsWith("image/")) {
      throw new Error(
        `${file.name} não é uma imagem válida.`
      );
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      throw new Error(
        `${file.name} excede o tamanho máximo de ${MAX_SIZE_MB} MB.`
      );
    }

    const image = await loadImage(file);

    try {
      if (
        image.width < MIN_WIDTH ||
        image.height < MIN_HEIGHT
      ) {
        throw new Error(
          `${file.name} possui resolução muito baixa (${image.width}×${image.height}). A resolução mínima permitida é ${MIN_WIDTH}×${MIN_HEIGHT}.`
        );
      }
    } finally {
      URL.revokeObjectURL(image.src);
    }
  }
}