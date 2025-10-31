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
                        'fullNameFnf',
                        'firstName',
                        'lastNamePrefix',
                        'lastName',
                        'hasFinancialOverviews',
                        'iban',
                        'ibanAttn',
                        'didAgreeAvg',
                        'dateDidAgreeAvg',
                        'addressLines',
                        'isParticipant',
                        'disableChangeContactNameOnPortal',
                        'noAddressesFound',
                        'isParticipantPcrProject',
                        'isParticipantSceProject',
                        'blockChangeAddress',
                        'blockChangeAddressNumber',
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
                                'eanElectricity',
                                'eanGas',
                            ],
                            rlt: {
                                country: { fld: ['id', 'name'] },
                                currentAddressEnergySupplierElectricity: {
                                    fld: [
                                        'id',
                                        'energySupplierId',
                                        'esNumber',
                                        'memberSince',
                                        'isCurrentSupplier',
                                        'endDatePrevious',
                                        'memberSinceNext',
                                    ],
                                    rlt: { energySupplier: [] },
                                    flt: {
                                        f: 'isCurrentSupplier',
                                        d: true,
                                    },
                                },
                            },
                        },
                        occupationsActive: {
                            fld: [
                                'id',
                                'occupationId',
                                'primaryContactId',
                                'contactId',
                                'primary',
                                'allowManageInPortal',
                            ],
                            rlt: {
                                occupation: {
                                    fld: ['id', 'primaryOccupation', 'secondaryOccupation'],
                                },
                                primaryContact: {
                                    fld: ['id', 'fullNameFnf'],
                                },
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
                        'fullNameFnf',
                        'typeId',
                        'firstName',
                        'lastNamePrefix',
                        'lastName',
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
                                'powerKwhConsumption',
                            ],
                            rlt: {
                                project: {
                                    fld: [
                                        'id',
                                        'name',
                                        'dateEnd',
                                        'linkProjectInfo',
                                        'linkUnderstandInfo',
                                        'textRegisterParticipationSingular',
                                        'textRegisterParticipationPlural',
                                        'linkUnderstandInfo',
                                        'showQuestionAboutMembership',
                                        'usesMollie',
                                    ],
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

    previewDocument: function(registerValues) {
        const requestUrl = `/contact/${registerValues.contactId}/${registerValues.projectId}/preview-document`;

        return axiosInstance.post(requestUrl, { registerValues });
    },

    previewDocumentIncrease: function(registerValues, registerType, participantId) {
        const requestUrl = `/contact/${registerValues.contactId}/${registerValues.projectId}/${participantId}/preview-increase-document`;

        return axiosInstance.post(requestUrl, { registerValues, registerType });
    },

    fetchContactFreeFields: function(contactId) {
        const requestUrl = `/contact/${contactId}/contact-free-fields`;

        return axiosInstance.get(requestUrl);
    },
    fetchAddressFreeFields: function(addressId) {
        const requestUrl = `/address/${addressId}/address-free-fields`;

        return axiosInstance.get(requestUrl);
    },

    fetchContactPortalFreeFields: function(contactId, urlPageRef) {
        const requestUrl = `/contact/${contactId}/contact-portal-free-fields`;

        return axiosInstance.get(requestUrl, {
            params: {
                urlPageRef: urlPageRef,
            },
        });
    },

    fetchContactProjects: function(contactId) {
        const requestUrl = `/contact/${contactId}/contact-projects`;

        return axiosInstance.get(requestUrl);
    },

    fetchContactContactGroups: function(contactId) {
        const requestUrl = `/contact/${contactId}/contact-groups`;

        return axiosInstance.get(requestUrl);
    },

    changeContactToContactGroup: function(contactId, contactGroupId, isChecked) {
        const action = isChecked ? 'remove' : 'add';
        const requestUrl = `/contact/${contactId}/contact-group/${contactGroupId}/${action}`;

        return axiosInstance.get(requestUrl);
    },

    fetchContactProjectData: function(contactId, projectId) {
        const requestUrl = `/contact/${contactId}/${projectId}/contact-project-data`;

        return axiosInstance.get(requestUrl);
    },

    fetchContactFinancialOverviewDocuments: function(contactId) {
        const requestUrl = `/contact/${contactId}/financial-overview-documents`;

        return axiosInstance.get(requestUrl);
    },

    financialOverviewContactDownload: function(id) {
        const requestUrl = `/financial-overview-contact/${id}/download`;

        return axiosInstance(requestUrl, { responseType: 'blob' });
    },

    fetchContactRelatedAdministrations: function(contactId) {
        const requestUrl = `/contact/${contactId}/related-administrations`;

        return axiosInstance.get(requestUrl);
    },
};
