export const CLIENTS_API_BASE = "/api/clients/";
export const DASHBOARD_API_BASE = "/api/dashboard/";


function getCsrfToken(): string | null {
  const token = document.cookie.match(/(^| )csrftoken=([^;]+)/)?.[2];
  return token ? decodeURIComponent(token) : null;
}

export async function requestJson(url: string, options: any, signal?: AbortSignal) {
  const method = options.method.toUpperCase();
  const headers = new Headers(options.headers || {});
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  if (!headers.has('X-CSRFToken')) {
    const token = getCsrfToken();
    if (token) headers.set('X-CSRFToken', token);
  }

  const res = await fetch(url, {
    method: method,
    credentials: "include",
    headers: headers,
    signal,
    body: JSON.stringify(options.body),
  });

  if (!res.ok) {
    throw new Error(`API error: HTTP ${res.status}`);
  }

  const rawJson = await res.json();
  return rawJson;
}