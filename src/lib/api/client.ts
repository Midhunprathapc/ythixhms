/**
 * Client-side API utility for fetching data from the Payload CMS REST API.
 * This should only be used in Client Components. For Server Components, use local Payload API.
 */

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiClient = {
  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...customConfig } = options;
    const headers = {
      'Content-Type': 'application/json',
      ...customConfig.headers,
    };

    let url = `${API_URL}/api${endpoint}`;
    
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const config: RequestInit = {
      ...customConfig,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while fetching the data.');
      }

      return data as T;
    } catch (error) {
      console.error(`[API Client Error] ${endpoint}:`, error);
      throw error;
    }
  },

  get<T>(endpoint: string, options?: FetchOptions) {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  patch<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string, options?: FetchOptions) {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
  },

};
