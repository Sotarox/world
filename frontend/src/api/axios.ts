import { isTokenExpired } from '@/utils/utils';
import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { initCsrf } from './csrf';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

api.interceptors.request.use(
  async (config) => {
    const method = config.method?.toUpperCase();
    if (method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      await initCsrf();
    }

    const { expiresAtEpochMs } = useAuthStore.getState();
    if (expiresAtEpochMs != null && isTokenExpired(expiresAtEpochMs)) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please log in again.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
