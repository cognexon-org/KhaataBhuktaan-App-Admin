import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 30000
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('vyapar_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error.message || 'Something went wrong';
    if (error?.response?.status === 401) {
      localStorage.removeItem('vyapar_admin_token');
      localStorage.removeItem('vyapar_admin_user');
    }
    return Promise.reject(new Error(message));
  }
);

export default http;
