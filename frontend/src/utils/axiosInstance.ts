import axios from "axios"


const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT as string;


const axiosInstanceWithAuth = axios.create({
    baseURL: BACKEND_ENDPOINT,
    withCredentials: true
});

const axiosInstance = axios.create({
    baseURL: BACKEND_ENDPOINT,
});

axiosInstanceWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!config.headers) {
    config.headers = {};
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstanceWithAuth;
export { axiosInstance };

