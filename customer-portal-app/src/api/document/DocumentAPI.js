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
};
