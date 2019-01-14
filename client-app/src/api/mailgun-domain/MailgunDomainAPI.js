import axiosInstance from '../default-setup/AxiosInstance';

const URL_MAILGUN_DOMAIN = `mailgun-domain`;

export default {
    fetchMailgunDomains: () => {
        const requestUrl = `${URL_MAILGUN_DOMAIN}/jory`;

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