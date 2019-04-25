import axios from 'axios';

const URL_WEBFORM = `${URL_API}/api/webform`;

export default {
    fetchWebformDetails: id => {
        const requestUrl = `${URL_WEBFORM}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    newWebform: webform => {
        const requestUrl = URL_WEBFORM;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, webform);
    },

    updateWebform: webform => {
        const requestUrl = `${URL_WEBFORM}/${webform.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, webform);
    },
};
