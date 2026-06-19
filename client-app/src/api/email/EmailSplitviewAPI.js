import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchSelectList: ({ filter, sorts, limit, offset }) => {
        return getAxiosInstance().get(`${getApiUrl()}/api/email-splitview/select-list`, {
            params: {
                jory: {
                    fld: [],
                    flt: filter,
                    srt: sorts,
                    lmt: limit,
                    ofs: offset,
                },
            },
        });
    },

    fetchEmail: id => {
        return getAxiosInstance()
            .get(`${getApiUrl()}/api/email-splitview/${id}`)
            .then(response => response.data);
    },

    update: (id, attributes) => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-splitview/${id}`, attributes);
    },

    updateMultiple: (ids, attributes) => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-splitview/update-multiple`, {
            ids: ids,
            ...attributes,
        });
    },

    storeReply: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-splitview/${id}/store-reply`);
    },

    storeReplyAll: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-splitview/${id}/store-reply-all`);
    },

    storeForward: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-splitview/${id}/store-forward`);
    },

    deleteMultiple: emailIds => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-splitview/delete-multiple`, {
            ids: emailIds,
        });
    },
};
