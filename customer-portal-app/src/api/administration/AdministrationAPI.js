import axiosInstance from '../default-setup/AxiosInstance';
import moment from 'moment';

export default {
    fetchAdministration: function(id) {
        const requestUrl = `/jory/administration/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'name',
                        'address',
                        'postalCode',
                        'city',
                        'kvkNumber',
                        'iBAN',
                        'ibanAttn',
                        'btwNumber',
                        'website',
                    ],
                    rlt: {
                        country: { fld: ['name'] },
                    },
                },
            },
        });
    },
};
