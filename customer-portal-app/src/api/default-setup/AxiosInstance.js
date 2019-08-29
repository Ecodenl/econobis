import axios from 'axios';
import moment from 'moment';

const BASE_URL = window.__SERVER_DATA__.base_url;
const localStorageToken = '__customer-portal-econobis-token__';
const localStorageLastActivity = '__customer-portal-econobis-last-activity__';

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
});

axiosInstance.interceptors.request.use(
    function(config) {
        // First check if token is expired or not
        checkTokenExpiration();
        // Do something before request is sent
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem(localStorageToken);
        config.headers.Authorization = AUTH_TOKEN;
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Check token expiration and redirect if token is expired
function checkTokenExpiration() {
    const lastActivity = moment(localStorage.getItem(localStorageLastActivity));

    if (
        !localStorage.getItem(localStorageLastActivity) ||
        lastActivity.add('30', 'minutes').format() < moment().format()
    ) {
        if (window.location.hash !== '#/login' && window.location.hash !== '#/loguit') {
            setTimeout(() => {
                localStorage.removeItem(localStorageToken);
                localStorage.removeItem(localStorageLastActivity);
                window.location.reload();
            }, 100);
        }
    } else {
        localStorage.setItem(localStorageLastActivity, moment().format());
    }
}

export default axiosInstance;
