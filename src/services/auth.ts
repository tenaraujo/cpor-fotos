const API_URL = import.meta.env.VITE_API_URL;

export async function validatePassword(password: string) {
  const response = await fetch(`${API_URL}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao validar senha.");
  }

  return response.json();
}