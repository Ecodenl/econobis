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

    deleteMultiple: emailIds => {
        return axiosInstance.post(`${URL_EMAIL}/delete-multiple`, {
            ids: emailIds,
        });
    },
};