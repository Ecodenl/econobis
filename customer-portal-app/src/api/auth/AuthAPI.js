import axios from 'axios';

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
        const requestUrl = `${BASE_URL}/auth/token`;
        delete axios.defaults.headers.common['Authorization'];

        return axios
            .post(requestUrl, loginCredentials)
            .then(response => response)
            .catch(error => {
                return { error: error?.response?.data?.error ?? 'Gebruikte logingegevens zijn onjuist!' };
            });
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
