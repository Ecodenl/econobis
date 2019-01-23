import axiosInstance from '../default-setup/AxiosInstance';
import axios from "axios";

const URL_MAILGUN_DOMAIN = `mailgun-domain`;

export default {
    fetchMailgunDomainDetails: (id) => {
        const requestUrl = `jory/mailgun-domain/${id}`;

        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'domain',
                        'secret',
                        'isVerified',
                    ],
                },
            }
        });
    },

    newMailgunDomain: (mailgunDomain) => {
        const requestUrl = URL_MAILGUN_DOMAIN;

        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        mailgunDomain.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, mailgunDomain);
    },

    updateMailgunDomain: (mailgunDomain) => {
        const requestUrl = `${URL_MAILGUN_DOMAIN}/${mailgunDomain.id}`;

        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axiosInstance.post(requestUrl, mailgunDomain);
    },
};