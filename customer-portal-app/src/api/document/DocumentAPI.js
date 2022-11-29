import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchDocumentDetails: id => {
        const requestUrl = `/jory/document/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'filename', 'description'],
                },
            },
        });
    },

    downloadDocument: function(id) {
        const requestUrl = `document/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
