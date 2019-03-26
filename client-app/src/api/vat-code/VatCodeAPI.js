import axiosInstance from '../default-setup/AxiosInstance';
import axios from "axios";

export default {
    fetchVatCodes: () => {
        const requestUrl = `jory/btw-code`;

        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'startDate',
                        'description',
                        'percentage',
                    ],
                }
            }
        });
    },
};