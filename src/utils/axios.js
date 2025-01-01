// utils/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3.106.60.17/api'
});

api.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    
    // Remove quotes if they exist
    if (token) {
        token = token.replace(/^"|"$/g, '');
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;