import { compressImage } from "./imageCompression";
import { validateFiles } from "./uploadValidation";

const API_URL = import.meta.env.VITE_API_URL;

interface UploadPhotosProps {
  password: string;
  prefix: string;
  files: File[];
}

interface UploadResponse {
  success: boolean;
  uploaded: number;
  message?: string;
}

export async function uploadPhotos({
  password,
  prefix,
  files,
}: UploadPhotosProps): Promise<UploadResponse> {

  // Valida antes de qualquer processamento
  await validateFiles(files);

  const formData = new FormData();

  formData.append("password", password);
  formData.append("prefix", prefix);

  for (const file of files) {

    // Compressão automática
    const compressed = await compressImage(file);

    formData.append("files", compressed);

  }

  const response = await fetch(
    `${API_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ??
      "Não foi possível enviar as fotografias."
    );
  }

  return result;
}