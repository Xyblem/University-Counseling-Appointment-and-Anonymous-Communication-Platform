import axios from 'axios';

// 环境判断
const isDevelopment = process.env.NODE_ENV === 'development';

// API基础URL配置
export const API_BASE_URL = isDevelopment
    ? 'http://localhost:8080/'
    : '/';

// 创建axios实例
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // 处理响应错误
        if (error.response?.status === 401) {
            // 处理未授权
            localStorage.removeItem('token');
            window.location.href = '#/auth/login';
        }
        return Promise.reject(error);
    }
);

export default api;