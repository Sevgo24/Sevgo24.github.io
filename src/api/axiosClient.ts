import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7035/api',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
});

// Interceptor opcional para manejar errores
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la API:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;