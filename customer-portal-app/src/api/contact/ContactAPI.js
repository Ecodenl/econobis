import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchContact: function(id) {
        const requestUrl = `/jory/contact/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'number',
                        'fullName',
                        // 'email',
                        // 'titleId',
                        'firstName',
                        // 'lastNamePrefixId',
                        'lastName',
                        'iban',
                        'ibanAttn',
                        'didAgreeAvg',
                        'addressLines',
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
                        },
                        emailAddresses: { fld: ['id', 'email', 'primary', 'typeId'] },
                        phoneNumbers: { fld: ['id', 'number', 'primary', 'typeId'] },
                        addresses: {
                            fld: ['id', 'street', 'number', 'addition', 'postalCode', 'city', 'countryId'],
                            flt: {
                                f: 'primary',
                                d: true,
                            },
                        },
                        contactEnergySuppliers: {
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
};
