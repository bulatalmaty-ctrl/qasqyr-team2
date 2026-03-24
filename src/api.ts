import { useState, useEffect } from 'react';

export const getAuthToken = () => localStorage.getItem('qasqyr_admin_token');
export const setAuthToken = (token: string) => localStorage.setItem('qasqyr_admin_token', token);
export const removeAuthToken = () => localStorage.removeItem('qasqyr_admin_token');

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(endpoint, { ...options, headers });
  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken(); // Autologout if unauthorized
    }
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};

export function useFetch<T>(endpoint: string, initialData?: T) {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = () => {
    setLoading(true);
    fetchAPI(endpoint)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, [endpoint]);

  return { data, loading, error, mutate: setData, reload };
}
