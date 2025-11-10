import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7035/api',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
});

export default axiosClient;