import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    update: (id, attributes) => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic/${id}`, attributes);
    },

    updateMultiple: (ids, attributes) => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic/update-multiple`, {
            ids: ids,
            ...attributes,
        });
    },

    storeNew: attributes => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic`, attributes);
    },

    storeReply: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic/${id}/store-reply`);
    },

    storeReplyAll: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic/${id}/store-reply-all`);
    },

    storeForward: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic/${id}/store-forward`);
    },

    storeGroupMail: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic/store-group-mail/${id}`);
    },

    deleteMultiple: emailIds => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic/delete-multiple`, {
            ids: emailIds,
        });
    },

    createContact: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-generic/${id}/create-contact`);
    },

    getAmountOpen: () => {
        const requestUrl = `${getApiUrl()}/api/email-generic/amount-open`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data);
    },
};
