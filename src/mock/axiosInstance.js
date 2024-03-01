// src/axiosInstance.js
import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});

// İstek gönderilmeden önce her isteğin header'ına token ekleyen bir interceptor
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? token : ''; 
  return config;
});

export default axiosInstance;
