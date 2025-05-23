import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchEmailTemplates: () => {
        const URL_EMAIL_TEMPLATE = `${getApiUrl()}/api/email-template`;
        const requestUrl = `${URL_EMAIL_TEMPLATE}/grid`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchEmailTemplate: id => {
        const URL_EMAIL_TEMPLATE = `${getApiUrl()}/api/email-template`;
        const requestUrl = `${URL_EMAIL_TEMPLATE}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchEmailTemplateWithUser: id => {
        const URL_EMAIL_TEMPLATE = `${getApiUrl()}/api/email-template`;
        const requestUrl = `${URL_EMAIL_TEMPLATE}/with-user/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeEmailTemplate: data => {
        const URL_EMAIL_TEMPLATE = `${getApiUrl()}/api/email-template`;
        const requestUrl = `${URL_EMAIL_TEMPLATE}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateEmailTemplate: data => {
        const URL_EMAIL_TEMPLATE = `${getApiUrl()}/api/email-template`;
        const requestUrl = `${URL_EMAIL_TEMPLATE}/${data.id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchEmailTemplatesPeek: () => {
        const URL_EMAIL_TEMPLATE = `${getApiUrl()}/api/email-template`;
        const requestUrl = `${URL_EMAIL_TEMPLATE}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteEmailTemplate: id => {
        const URL_EMAIL_TEMPLATE = `${getApiUrl()}/api/email-template`;
        const requestUrl = `${URL_EMAIL_TEMPLATE}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
