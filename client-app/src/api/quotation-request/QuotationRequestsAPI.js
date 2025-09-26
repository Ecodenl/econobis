import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchQuotationRequests: ({ filters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/quotation-request/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekQuotationRequests: () => {
        const requestUrl = `${getApiUrl()}/api/quotation-request/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekQuotationRequestsForContacts: contactIds => {
        const requestUrl = `${getApiUrl()}/api/quotation-request/peek`;

        return getAxiosInstance()
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
        const requestUrl = `${getApiUrl()}/api/quotation-request/amount-open`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getCSV: ({ filters, sorts }) => {
        const requestUrl = `${getApiUrl()}/api/quotation-request/csv`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },
};
