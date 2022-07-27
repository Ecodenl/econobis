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
                        'email',
                    ],
                    rlt: {
                        country: { fld: ['name'] },
                        documentsOnPortal: { fld: ['id', 'filename', 'description'] },
                    },
                },
            },
        });
    },
    documentDownload: function(administrationId, id) {
        const requestUrl = `/administration/${administrationId}/document/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
