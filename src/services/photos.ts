export interface Photo {
  key: string;
  url: string;
  size: number;
  uploaded: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function getPhotos(prefix: string): Promise<Photo[]> {
  const response = await fetch(
    `${API_URL}/api/photos?prefix=${encodeURIComponent(prefix)}`
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar as fotografias.");
  }

  return response.json();
}