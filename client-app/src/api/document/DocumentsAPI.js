import axiosInstance from '../default-setup/AxiosInstance';

const URL_DOCUMENT = `${URL_API}/api/document`;

export default {
    fetchDocuments: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_DOCUMENT}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchDocumentsPeek: () => {
        const requestUrl = `${URL_DOCUMENT}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
