import axios from 'axios';

const URL_API = process.env.URL_API;

export default {
    getSystemData() {
        const requestUrl = `${URL_API}/api/system-data`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl);
    },
};
