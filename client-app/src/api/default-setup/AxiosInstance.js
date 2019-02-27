import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${URL_API}/api/`,
});

const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default axiosInstance;