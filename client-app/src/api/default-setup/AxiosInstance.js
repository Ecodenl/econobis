import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${window.URL_API}/api/`,
});

axiosInstance.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        config.headers.Authorization = AUTH_TOKEN;
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;
