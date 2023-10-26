import axiosInstance from '../default-setup/AxiosInstance';

const URL_EMAIL = `${URL_API}/api/email-generic`;

export default {
    update: (id, attributes) => {
        return axiosInstance
            .post(`${URL_EMAIL}/${id}`, attributes);
    },

    updateMultiple: (ids, attributes) => {
        return axiosInstance
            .post(`${URL_EMAIL}/update-multiple`, {
                ids: ids,
                ...attributes,
            });
    },

    storeNew: (attributes) => {
        return axiosInstance
            .post(`${URL_EMAIL}`, attributes);
    },

    storeReply: (id) => {
        return axiosInstance
            .post(`${URL_EMAIL}/${id}/store-reply`);
    },

    storeReplyAll: (id) => {
        return axiosInstance
            .post(`${URL_EMAIL}/${id}/store-reply-all`);
    },

    storeForward: (id) => {
        return axiosInstance
            .post(`${URL_EMAIL}/${id}/store-forward`);
    },

    storeGroupMail: (id) => {
        return axiosInstance
            .post(`${URL_EMAIL}/store-group-mail/${id}`);
    },

    deleteMultiple: emailIds => {
        return axiosInstance.post(`${URL_EMAIL}/delete-multiple`, {
            ids: emailIds,
        });
    },

    createContact: id => {
        return axiosInstance.post(`${URL_EMAIL}/${id}/create-contact`);
    },

    getAmountOpen: () => {
        const requestUrl = `${URL_EMAIL}/amount-open`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data);
    },
};