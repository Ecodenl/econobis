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
                        'fullNameFnf',
                        'typeId',
                        'firstName',
                        'lastNamePrefix',
                        'lastName',
                        'hasFinancialOverviews',
                        'singleRelatedAdministration',
                        'iban',
                        'ibanAttn',
                        'didAgreeAvg',
                        'dateDidAgreeAvg',
                        'addressLines',
                        'portalSettingsLayoutAssigned',
                        'inspectionPersonTypeId',
                        'isOrganisationContact',
                        'isOccupant',
                    ],
                    rlt: {
                        occupations: {
                            fld: ['id', 'occupationId', 'primaryContactId', 'contactId', 'primary'],
                            rlt: {
                                occupation: {
                                    fld: ['id', 'primaryOccupation', 'secondaryOccupation', 'occupationForPortal'],
                                },
                                primaryContact: {
                                    fld: [
                                        'id',
                                        'typeId',
                                        'fullNameFnf',
                                        'firstName',
                                        'lastNamePrefix',
                                        'lastName',
                                        'hasFinancialOverviews',
                                        'singleRelatedAdministration',
                                    ],
                                },
                                contact: {
                                    fld: ['id', 'typeId', 'fullNameFnf', 'firstName', 'lastNamePrefix', 'lastName'],
                                },
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
