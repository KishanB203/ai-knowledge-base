const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1';

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export async function postJson<TResponse>(
  path: string,
  body: Record<string, unknown>,
): Promise<ApiResult<TResponse>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const payload = (await response.json()) as ApiResult<TResponse>;

  if (!response.ok) {
    return {
      success: false,
      message: payload.message ?? 'Request failed.',
    };
  }

  return payload;
}

export async function getJson<TResponse>(
  path: string,
  token: string,
): Promise<ApiResult<TResponse>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const payload = (await response.json()) as ApiResult<TResponse>;

  if (!response.ok) {
    return {
      success: false,
      message: payload.message ?? 'Request failed.',
    };
  }

  return payload;
}
