import axios from 'axios';

const URL_MAILGUN_DOMAIN = `${URL_API}/api/mailgun-domain`;

export default {
    fetchMailgunDomains: () => {
        const requestUrl = `${URL_MAILGUN_DOMAIN}/jory`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                jory: {
                    'fld': [
                        'id',
                        'domain',
                        'isVerified'
                    ],
                }
            }
        });
    },
};