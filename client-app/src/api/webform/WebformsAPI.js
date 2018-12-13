import axios from 'axios';

const URL_WEBFORM = `${URL_API}/api/webform`;

export default {
    fetchWebforms: () => {
        const requestUrl = `${URL_WEBFORM}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    deleteWebform: (id) => {
        const requestUrl = `${URL_WEBFORM}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },
};