import axios from 'axios';
import { getApiUrl } from '../utils/ApiUrl';

let instance = null;

const getAxiosInstance = () => {
    if (!instance) {
        instance = axios.create({
            baseURL: `${getApiUrl()}/api/`,
        });

        instance.interceptors.request.use(
            function(config) {
                const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
                const TWO_FACTOR_TOKEN = localStorage.getItem('two_factor_token');
                config.headers.Authorization = AUTH_TOKEN;
                config.headers.TwoFactorToken = TWO_FACTOR_TOKEN;
                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );
    }

    return instance;
};

export default getAxiosInstance;
