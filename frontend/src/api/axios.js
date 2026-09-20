import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fullstack-login-app-31m1.onrender.com/api/auth',
  withCredentials: true,
});

export default api;