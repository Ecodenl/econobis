import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_EMAIL = `${URL_API}/api/email`;

export default {
    fetchEmails: () => {
        const requestUrl = `${URL_EMAIL}/grid/in-folder/inbox`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },
};