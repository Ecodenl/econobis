import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_MAILGUN_DOMAIN = `mailgun-domain`;

export default {
    fetchMailgunDomainDetails: id => {
        const requestUrl = `jory/mailgun-domain/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    // fld: ['id', 'domain', 'secret', 'isVerified'],
                    fld: ['id', 'domain', 'isVerified'],
                },
            },
        });
    },

    newMailgunDomain: mailgunDomain => {
        const requestUrl = URL_MAILGUN_DOMAIN;

        mailgunDomain.jory = JSON.stringify({
            fld: ['id'],
        });

        return getAxiosInstance().post(requestUrl, mailgunDomain);
    },

    updateMailgunDomain: mailgunDomain => {
        const requestUrl = `${URL_MAILGUN_DOMAIN}/${mailgunDomain.id}`;

        return getAxiosInstance().post(requestUrl, mailgunDomain);
    },
};
