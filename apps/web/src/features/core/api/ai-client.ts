const AI_BASE_URL = import.meta.env.VITE_AI_BASE_URL ?? 'http://localhost:8000';

export async function uploadCompanyPdf(companyId: string, file: File): Promise<{ chunks: number; file: string }> {
  const form = new FormData();
  form.append('company_id', companyId);
  form.append('file', file);
  const response = await fetch(`${AI_BASE_URL}/api/v1/rag/upload`, { method: 'POST', body: form });
  if (!response.ok) throw new Error('upload failed');
  return response.json() as Promise<{ chunks: number; file: string }>;
}

export async function chatWithAi(companyId: string, question: string): Promise<{ answer: string; citations: string[] }> {
  const response = await fetch(`${AI_BASE_URL}/api/v1/rag/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ company_id: companyId, question }) });
  if (!response.ok) throw new Error('chat failed');
  return response.json() as Promise<{ answer: string; citations: string[] }>;
}
