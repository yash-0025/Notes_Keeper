import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

const base_url = import.meta.env.VITE_BASE_URL 
// const navigate = useNavigate();


const axiosInstance = axios.create({
    baseURL: base_url,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            // navigate('/login')
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;