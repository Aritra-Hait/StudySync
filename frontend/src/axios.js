import axios from "axios";

const BASE_URL = (import.meta.env.MODE === "development") ? import.meta.env.VITE_API_BASE_URL : "/api";


const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const calendarAPI = axios.create({
    baseURL: `${BASE_URL}/planner`,
});

calendarAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export { calendarAPI };
export default api;
