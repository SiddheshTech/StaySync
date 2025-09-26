const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

function authHeaders() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet<T>(path: string, params?: Record<string, any>): Promise<T> {
  const url = new URL(path.startsWith('http') ? path : API_BASE + path);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') return;
      url.searchParams.set(k, String(v));
    });
  }
  const res = await fetch(url.toString(), { headers: { 'Content-Type': 'application/json', ...authHeaders() }, credentials: 'include' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost<T>(path: string, body?: any): Promise<T> {
  const url = path.startsWith('http') ? path : API_BASE + path;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: body ? JSON.stringify(body) : undefined, credentials: 'include' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiUploadImage(file: File): Promise<{ url: string; public_id: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(API_BASE + '/uploads/image', { method: 'POST', headers: { ...authHeaders() }, body: formData, credentials: 'include' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}



