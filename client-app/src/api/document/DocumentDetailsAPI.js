import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_DOCUMENT = `${URL_API}/api/document`;

export default {
    newDocument: (data) => {
        const requestUrl = `${URL_DOCUMENT}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data);
    },

};
