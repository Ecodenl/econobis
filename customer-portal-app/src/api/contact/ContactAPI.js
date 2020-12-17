import axiosInstance from '../default-setup/AxiosInstance';
import moment from '../project/ProjectAPI';

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
                        'isParticipantPcrProject',
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
                                'lastNamePrefixId',
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
                            rlt: {
                                country: { fld: ['id', 'name'] },
                            },
                        },
                        occupations: {
                            fld: ['id', 'occupationId', 'primaryContactId', 'contactId', 'primary'],
                            rlt: {
                                occupation: {
                                    fld: ['id', 'primaryOccupation', 'secondaryOccupation', 'occupationForPortal'],
                                },
                                primaryContact: {
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
                                'eanGas',
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
                                    fld: ['id', 'name', 'dateEnd', 'linkUnderstandInfo', 'showQuestionAboutMembership'],
                                    rlt: {
                                        projectType: { fld: ['id', 'codeRef'] },
                                        administration: { fld: ['name'] },
                                    },
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

    previewDocument: registerValues => {
        const requestUrl = `/contact/${registerValues.contactId}/${registerValues.projectId}/preview-document`;

        return axiosInstance.post(requestUrl, registerValues);
    },

    fetchContactProjectData: function(contactId, projectId) {
        const requestUrl = `/contact/${contactId}/${projectId}/contact-project-data`;
        return axiosInstance.get(requestUrl);
    },

    fetchContactFinancialOverviewDocuments: function(contactId) {
        const requestUrl = `/contact/${contactId}/financial-overview-documents`;

        return axiosInstance.get(requestUrl);
    },
};
