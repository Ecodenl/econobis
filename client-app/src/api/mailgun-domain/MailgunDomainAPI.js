import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchMailgunDomains: () => {
        const requestUrl = `jory/mailgun-domain`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'domain',
                        'isVerified',
                    ],
                }
            }
        });
    },
};