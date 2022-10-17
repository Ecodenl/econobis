import axiosInstance from '../default-setup/AxiosInstance';

const URL_DOCUMENT = `${URL_API}/api/document`;

export default {
    fetchDocumentDetails: id => {
        const requestUrl = `${URL_DOCUMENT}/${id}`;

        return axiosInstance.get(requestUrl);
    },

    newDocument: data => {
        const requestUrl = `${URL_DOCUMENT}`;

        return axiosInstance.post(requestUrl, data);
    },

    updateDocument: document => {
        const requestUrl = `${URL_DOCUMENT}/${document.id}`;

        return axiosInstance.post(requestUrl, document);
    },

    deleteDocument: id => {
        const requestUrl = `${URL_DOCUMENT}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    download: id => {
        const requestUrl = `${URL_DOCUMENT}/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
