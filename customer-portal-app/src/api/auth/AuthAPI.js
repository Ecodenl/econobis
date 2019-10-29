import axios from 'axios';

const AUTH_KEY = {
    client_id: window.__SERVER_DATA__.client_id,
    client_secret: window.__SERVER_DATA__.client_key,
    grant_type: 'password',
};

const BASE_URL = window.__SERVER_DATA__.base_url;

export default {
    newAccount: payload => {
        const requestUrl = `${BASE_URL}/new-account`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, payload);
    },
    newAccountSuccess: payload => {
        const requestUrl = `${BASE_URL}/new-account-success`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, payload);
    },

    login: loginCredentials => {
        const requestUrl = `${BASE_URL}/oauth/token`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, { ...AUTH_KEY, ...loginCredentials });
    },

    register: payload => {
        const requestUrl = `${BASE_URL}/register`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, payload);
    },

    forgot: email => {
        const requestUrl = `${BASE_URL}/password/email`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, email);
    },

    reset: payload => {
        const requestUrl = `${BASE_URL}/password/reset`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, payload);
    },
};
