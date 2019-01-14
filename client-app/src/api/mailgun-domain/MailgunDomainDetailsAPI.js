import axiosInstance from '../default-setup/AxiosInstance';

const URL_MAILGUN_DOMAIN = `mailgun-domain`;

export default {
    fetchMailgunDomainDetails: (id) => {
        const requestUrl = `${URL_MAILGUN_DOMAIN}/jory`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    flt: {
                      f: 'id',
                      d: id,
                    },
                    fld: [
                        'id',
                        'domain',
                        'secret',
                        'isVerified',
                    ],
                },
            }
        });
    },

    newMailgunDomain: (mailgunDomain) => {
        const requestUrl = URL_MAILGUN_DOMAIN;

        mailgunDomain.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, mailgunDomain);
    },

    updateMailgunDomain: (mailgunDomain) => {
        const requestUrl = `${URL_MAILGUN_DOMAIN}/${mailgunDomain.id}`;

        return axiosInstance.post(requestUrl, mailgunDomain);
    },
};