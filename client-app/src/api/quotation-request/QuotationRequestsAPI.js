import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchQuotationRequests: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/quotation-request/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekQuotationRequests: () => {
        const requestUrl = `${URL_API}/api/quotation-request/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekQuotationRequestsForContacts: contactIds => {
        const requestUrl = `${URL_API}/api/quotation-request/peek`;

        return axiosInstance
            .get(requestUrl, {
                params: {
                    contactIds: JSON.stringify(contactIds),
                },
            })
            .then(function(response) {
                return response.data.data;
            });
    },

    getAmountActive: () => {
        const requestUrl = `${URL_API}/api/quotation-request/amount-open`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getCSV: ({ filters, sorts }) => {
        const requestUrl = `${URL_API}/api/quotation-request/csv`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getExcel: ({ filters, sorts, type }) => {
        const requestUrl = `${URL_API}/api/quotation-request/excel/` + type;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
            responseType: 'blob',
        });
    },
};
