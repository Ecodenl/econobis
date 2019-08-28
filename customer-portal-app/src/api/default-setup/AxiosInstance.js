import axios from 'axios';

const API_URL = window.__SERVER_DATA__.api_url;
const localStorageKey = '__customer-portal-econobis__';

const axiosInstance = axios.create({
    baseURL: `${API_URL}`,
});

const AUTH_TOKEN = 'Bearer ' + localStorage.getItem(localStorageKey);
axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default axiosInstance;
