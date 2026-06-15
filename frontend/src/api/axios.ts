import { isTokenExpired } from '@/utils/utils';
import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const expiresAtEpochMs = localStorage.getItem('expiresAtEpochMs');
    if (expiresAtEpochMs && isTokenExpired(Number(expiresAtEpochMs))) {
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
