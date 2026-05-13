const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';
export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json() as Promise<T>;
}
