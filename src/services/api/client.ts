const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${API_URL}${path}`,
    options
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ?? "Erro na comunicação com a API."
    );
  }

  return data as T;
}