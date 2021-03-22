import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchByCode: code => {
        const requestUrl = `/jory/participant-mutation`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    flt: {
                        f: 'code',
                        d: code,
                    },
                    fld: [
                        'econobisPaymentLink',
                        'isPaidByMollie',
                    ],
                    rlt: {
                        participation: {
                            rlt: {
                                project: {
                                    fld: [
                                        'name',
                                        'textRegistrationFinished',
                                    ]
                                }
                            }
                        },
                    },
                },
            },
        });
    },
};
