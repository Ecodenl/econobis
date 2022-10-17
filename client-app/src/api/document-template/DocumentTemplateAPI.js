import axiosInstance from '../default-setup/AxiosInstance';

const URL_DOCUMENT_TEMPLATE = `${URL_API}/api/document-template`;

export default {
    fetchDocumentTemplates: () => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/grid`;

        return axiosInstance.get(requestUrl);
    },

    fetchDocumentTemplate: id => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeDocumentTemplate: data => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateDocumentTemplate: data => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${data.id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchDocumentTemplatesPeekGeneral: () => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/peekGeneral`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchDocumentTemplatesPeekNotGeneral: () => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/peekNotGeneral`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteDocumentTemplate: id => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    duplicateTemplate: id => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${id}/duplicate`;

        return axiosInstance.post(requestUrl);
    },
};
