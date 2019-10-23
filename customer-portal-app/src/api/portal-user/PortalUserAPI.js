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
                        occupations: {
                            fld: ['id', 'occupationId', 'primaryContactId', 'contactId'],
                            rlt: {
                                occupation: {
                                    fld: ['id', 'primaryOccupation', 'secondaryOccupation'],
                                },
                                primaryContact: { fld: ['id', 'fullName'] },
                                contact: { fld: ['id', 'fullName'] },
                            },
                        },
                    },
                },
            },
        });
    },

    fetchPortalUserEmail: function() {
        return axiosInstance.get(`/portal-user-email`);
    },

    changeEmail: values => {
        const requestUrl = `/portal-user/change-email`;

        return axiosInstance.post(requestUrl, values);
    },

    changePassword: values => {
        const requestUrl = `/portal-user/change-password`;

        return axiosInstance.post(requestUrl, values);
    },
};
