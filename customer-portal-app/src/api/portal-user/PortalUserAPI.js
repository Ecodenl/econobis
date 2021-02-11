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
                        'portalSettingsLayoutAssigned',
                    ],
                    rlt: {
                        occupations: {
                            fld: ['id', 'occupationId', 'primaryContactId', 'contactId', 'primary'],
                            rlt: {
                                occupation: {
                                    fld: ['id', 'primaryOccupation', 'secondaryOccupation', 'occupationForPortal'],
                                },
                                primaryContact: { fld: ['id', 'fullName', 'typeId'] },
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
