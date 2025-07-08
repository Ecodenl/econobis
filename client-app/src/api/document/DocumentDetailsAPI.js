import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchDocumentDetails: id => {
        const URL_DOCUMENT = `${getApiUrl()}/api/document`;
        const requestUrl = `${URL_DOCUMENT}/${id}`;

        return getAxiosInstance().get(requestUrl);
    },

    newDocument: data => {
        const URL_DOCUMENT = `${getApiUrl()}/api/document`;
        const requestUrl = `${URL_DOCUMENT}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    updateDocument: document => {
        const URL_DOCUMENT = `${getApiUrl()}/api/document`;
        const requestUrl = `${URL_DOCUMENT}/${document.id}`;

        return getAxiosInstance().post(requestUrl, document);
    },

    deleteDocument: id => {
        const URL_DOCUMENT = `${getApiUrl()}/api/document`;
        const requestUrl = `${URL_DOCUMENT}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    download: id => {
        const URL_DOCUMENT = `${getApiUrl()}/api/document`;
        const requestUrl = `${URL_DOCUMENT}/${id}/download`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },
};
