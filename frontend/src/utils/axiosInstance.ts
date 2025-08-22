import axios from "axios"


const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT as string;


const axiosInstance = axios.create({
    baseURL: BACKEND_ENDPOINT,
    withCredentials: true
});

export default axiosInstance;
