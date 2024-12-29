// utils/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
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