import axios from "axios";
import {Cookie} from "@/utils/storage";

const baseUrl = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});


instance.interceptors.request.use(
    (config) => {
        const token = Cookie.get("token");
        (config.headers as any).Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.message == "Network Error") ElMessage.error("网络连接错误");
        if (error.message.startsWith("timeout")) ElMessage.error("网络连接超时");
        if (error.response && error.response.data) ElMessage.error(error.response.data.message);
        return Promise.reject(error);
    }
);


export default instance;