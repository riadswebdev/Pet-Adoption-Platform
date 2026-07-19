const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const API_BASE_URL = `${backendBaseUrl}`;

interface ApiClientOptions extends RequestInit {
  timeoutMs?: number;
}

export async function apiClient(
  endpoint: string,
  options: ApiClientOptions = {},
) {
  const timeoutMs = Number(options.timeoutMs ?? 10000);
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  headers.set("X-Requested-With", "XMLHttpRequest");

  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeoutId =
    controller && typeof window !== "undefined" ?
      window.setTimeout(() => controller.abort(), timeoutMs)
    : undefined;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
      signal: controller?.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message ||
        errorData?.error ||
        `API request failed with status ${response.status}`;
      const details = errorData?.details;

      throw new Error(
        details ? `${message}: ${JSON.stringify(details)}` : message,
      );
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
