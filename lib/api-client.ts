const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface FetchOptions extends RequestInit {
  json?: unknown;
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { json, headers: customHeaders, ...rest } = options;

  const headers: HeadersInit = {
    ...customHeaders,
  };

  if (json) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers,
    body: json ? JSON.stringify(json) : rest.body,
    ...rest,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new ApiError(response.status, errorBody.error || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path),

  post: <T>(path: string, json?: unknown) =>
    apiFetch<T>(path, { method: 'POST', json }),

  put: <T>(path: string, json?: unknown) =>
    apiFetch<T>(path, { method: 'PUT', json }),

  patch: <T>(path: string, json?: unknown) =>
    apiFetch<T>(path, { method: 'PATCH', json }),

  delete: <T>(path: string) =>
    apiFetch<T>(path, { method: 'DELETE' }),
};
