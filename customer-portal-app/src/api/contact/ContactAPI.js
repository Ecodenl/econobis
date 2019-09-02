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
                        // 'iban',
                        // 'ibanName',
                        // 'didAgreeAvg',
                        'addressLines',
                    ],
                    rlt: {
                        emailAddresses: { fld: ['id', 'email', 'primary', 'typeId'] },
                        phoneNumbers: { fld: ['id', 'number', 'primary', 'typeId'] },
                        addresses: {
                            fld: ['id', 'street', 'number', 'addition', 'postalCode', 'city', 'countryId'],
                        },
                        contactEnergySuppliers: {
                            fld: [
                                'id',
                                'energySupplierId',
                                'esNumber',
                                'eanElectricity',
                                // 'clientNr',
                                'memberSince',
                                'isCurrentSupplier',
                            ],
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
