import axios from 'axios';

const AUTH_KEY = {
    client_id: window.__SERVER_DATA__.clientId,
    client_secret: window.__SERVER_DATA__.clientKey,
    grant_type: 'password',
};

const URL_API = window.__SERVER_DATA__.urlApi;

export default {
    login: loginCredentials => {
        const requestUrl = `${URL_API}/oauth/token`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, { ...AUTH_KEY, ...loginCredentials });
    },
};
