import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchMailgunDomains: () => {
        const requestUrl = `jory/mailgun-domain`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'domain', 'isVerified'],
                },
            },
        });
    },
};
