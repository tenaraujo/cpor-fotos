const MAX_FILES = 50;

const MAX_SIZE_MB = 15;

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
  }
}