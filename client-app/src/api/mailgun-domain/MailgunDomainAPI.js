import axiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';

export default {
    fetchMailgunDomains: () => {
        const requestUrl = `jory/mailgun-domain`;

        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'domain', 'isVerified'],
                },
            },
        });
    },
};
