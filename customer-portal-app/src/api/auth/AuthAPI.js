import axios from 'axios';

const AUTH_KEY = {
    client_id: window.__SERVER_DATA__.client_id,
    client_secret: window.__SERVER_DATA__.client_key,
    grant_type: 'password',
};

const API_URL = window.__SERVER_DATA__.api_url;

export default {
    login: loginCredentials => {
        const requestUrl = `${API_URL}/oauth/token`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, { ...AUTH_KEY, ...loginCredentials });
    },
};
