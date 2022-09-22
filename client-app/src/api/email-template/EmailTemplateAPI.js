import axiosInstance from '../default-setup/AxiosInstance';

const URL_EMAIL_TEMPLATE = `${URL_API}/api/email-template`;

export default {
    fetchEmailTemplates: () => {
        const requestUrl = `${URL_EMAIL_TEMPLATE}/grid`;

        return axiosInstance.get(requestUrl);
    },

    fetchEmailTemplate: id => {
        const requestUrl = `${URL_EMAIL_TEMPLATE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchEmailTemplateWithUser: id => {
        const requestUrl = `${URL_EMAIL_TEMPLATE}/with-user/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeEmailTemplate: data => {
        const requestUrl = `${URL_EMAIL_TEMPLATE}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateEmailTemplate: data => {
        const requestUrl = `${URL_EMAIL_TEMPLATE}/${data.id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchEmailTemplatesPeek: () => {
        const requestUrl = `${URL_EMAIL_TEMPLATE}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteEmailTemplate: id => {
        const requestUrl = `${URL_EMAIL_TEMPLATE}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
