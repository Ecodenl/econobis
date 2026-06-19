import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchDocuments: ({ filters, sorts, pagination }) => {
        const URL_DOCUMENT = `${getApiUrl()}/api/document`;
        const requestUrl = `${URL_DOCUMENT}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchDocumentsPeek: () => {
        const URL_DOCUMENT = `${getApiUrl()}/api/document`;
        const requestUrl = `${URL_DOCUMENT}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchDefaultEmailDocumentsPeek: () => {
        const URL_DOCUMENT = `${getApiUrl()}/api/document`;
        const requestUrl = `${URL_DOCUMENT}/default-email-documents-peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
