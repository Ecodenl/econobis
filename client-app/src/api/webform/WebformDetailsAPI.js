import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_WEBFORM = `${URL_API}/api/webform`;

export default {
    newWebform: (webform) => {
        const requestUrl = URL_WEBFORM;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, webform);
    },
};