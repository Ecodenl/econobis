import axiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';

const URL_VAT_CODE = `vat-code`;

export default {
    newVatCode: vatCode => {
        const requestUrl = URL_VAT_CODE;

        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        vatCode.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, vatCode);
    },
};
