import { base_api_url } from "../config/config";

export async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${base_api_url}${endpoint}`, {
      next: {
        revalidate: 1000,
        ...(options.next || {}),
      },
      ...options,
    });

    if (!response.ok) {
      console.error(`API Error ${response.status}: ${endpoint}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Backend Error (${endpoint})`, error.message);
    return null;
  }
}