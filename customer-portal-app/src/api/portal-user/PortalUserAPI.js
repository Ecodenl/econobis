import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchPortalUserDetails: function() {
        const requestUrl = `/me`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'number',
                        'fullName',
                        'iban',
                        'ibanAttn',
                        'didAgreeAvg',
                        'dateDidAgreeAvg',
                        'addressLines',
                    ],
                    rlt: {
                        primaryOccupations: {
                            fld: ['id', 'contactId'],
                            rlt: {
                                contact: ['id', 'number', 'fullName'],
                            },
                        },
                    },
                },
            },
        });
    },
};
