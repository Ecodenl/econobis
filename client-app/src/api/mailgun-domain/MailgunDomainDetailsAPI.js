import axios from 'axios';

const URL_MAILGUN_DOMAIN = `${URL_API}/api/mailgun-domain`;

export default {
    fetchWebformDetails: (id) => {
        const requestUrl = `${URL_MAILGUN_DOMAIN}/jory/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    newMailgunDomain: (mailgunDomain) => {
        const requestUrl = URL_MAILGUN_DOMAIN;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        mailgunDomain.jory = JSON.stringify({
            fld: ['id'],
        });

        return axios.post(requestUrl, mailgunDomain);
    },

    updateWebform: (mailgunDomain) => {
        const requestUrl = `${URL_MAILGUN_DOMAIN}/${mailgunDomain.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, mailgunDomain);
    },
};