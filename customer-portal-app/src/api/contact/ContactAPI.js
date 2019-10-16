import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchContact: function(id) {
        const requestUrl = `/jory/contact/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'typeId',
                        'number',
                        'fullName',
                        'iban',
                        'ibanAttn',
                        'didAgreeAvg',
                        'dateDidAgreeAvg',
                        'addressLines',
                        'isParticipant',
                    ],
                    rlt: {
                        person: {
                            fld: [
                                'id',
                                'firstName',
                                'lastName',
                                'initials',
                                'titleId',
                                'lastNamePrefix',
                                'dateOfBirth',
                            ],
                            rlt: {
                                title: { fld: ['id', 'name'] },
                            },
                        },
                        organisation: {
                            fld: ['id', 'name', 'website', 'chamberOfCommerceNumber', 'vatNumber'],
                        },
                        emailAddresses: { fld: ['id', 'email', 'primary', 'typeId'] },
                        phoneNumbers: { fld: ['id', 'number', 'primary', 'typeId'] },
                        addresses: {
                            fld: [
                                'id',
                                'street',
                                'number',
                                'addition',
                                'postalCode',
                                'city',
                                'countryId',
                                'primary',
                                'typeId',
                            ],
                        },
                        primaryOccupations: {
                            fld: ['id', 'occupationId', 'primaryContactId', 'contactId', 'primary'],
                            rlt: {
                                occupation: {
                                    fld: ['id', 'primaryOccupation', 'secondaryOccupation'],
                                },
                                contact: {
                                    fld: ['id', 'fullName'],
                                },
                            },
                        },
                        primaryContactEnergySupplier: {
                            fld: [
                                'id',
                                'energySupplierId',
                                'esNumber',
                                'eanElectricity',
                                'memberSince',
                                'isCurrentSupplier',
                            ],
                            rlt: { energySupplier: [] },
                            flt: {
                                f: 'isCurrentSupplier',
                                d: true,
                            },
                        },
                    },
                },
            },
        });
    },

    fetchContactWithParticipants: function(id) {
        const requestUrl = `/jory/contact/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'typeId',
                        'number',
                        'fullName',
                        'iban',
                        'ibanAttn',
                        'didAgreeAvg',
                        'dateDidAgreeAvg',
                        'addressLines',
                    ],
                    rlt: {
                        participations: {
                            fld: [
                                'id',
                                'dateRegister',
                                'didAcceptAgreement',
                                'dateDidAcceptAgreement',
                                'didUnderstandInfo',
                                'dateDidUnderstandInfo',
                                'participationsDefinitive',
                                'participationsGranted',
                                'participationsOptioned',
                                'participationsInteressed',
                                'amountDefinitive',
                                'amountGranted',
                                'amountOptioned',
                                'amountInteressed',
                            ],
                            rlt: {
                                project: {
                                    fld: ['id', 'name'],
                                    rlt: { projectType: { fld: ['id', 'codeRef'] } },
                                },
                            },
                        },
                    },
                },
            },
        });
    },

    updateContact: contact => {
        const requestUrl = `/contact/${contact.id}`;

        return axiosInstance.post(requestUrl, contact);
    },

    previewDocument: (contactId, projectId) => {
        const requestUrl = `/contact/${contactId}/${projectId}/preview-document`;

        return axiosInstance.get(requestUrl);
    },
};
