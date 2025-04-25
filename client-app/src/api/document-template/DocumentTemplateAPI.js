import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchDocumentTemplates: () => {
        const URL_DOCUMENT_TEMPLATE = `${getApiUrl()}/api/document-template`;
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/grid`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchDocumentTemplate: id => {
        const URL_DOCUMENT_TEMPLATE = `${getApiUrl()}/api/document-template`;
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeDocumentTemplate: data => {
        const URL_DOCUMENT_TEMPLATE = `${getApiUrl()}/api/document-template`;
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateDocumentTemplate: data => {
        const URL_DOCUMENT_TEMPLATE = `${getApiUrl()}/api/document-template`;
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${data.id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchDocumentTemplatesPeekGeneral: () => {
        const URL_DOCUMENT_TEMPLATE = `${getApiUrl()}/api/document-template`;
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/peekGeneral`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchDocumentTemplatesPeekNotGeneral: () => {
        const URL_DOCUMENT_TEMPLATE = `${getApiUrl()}/api/document-template`;
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/peekNotGeneral`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteDocumentTemplate: id => {
        const URL_DOCUMENT_TEMPLATE = `${getApiUrl()}/api/document-template`;
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    duplicateTemplate: id => {
        const URL_DOCUMENT_TEMPLATE = `${getApiUrl()}/api/document-template`;
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${id}/duplicate`;

        return getAxiosInstance().post(requestUrl);
    },
};
