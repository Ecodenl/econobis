import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${window.URL_API}/api/`,
});

axiosInstance.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        const TWO_FACTOR_TOKEN = localStorage.getItem('two_factor_token');
        config.headers.Authorization = AUTH_TOKEN;
        config.headers.TwoFactorToken = TWO_FACTOR_TOKEN;
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;
