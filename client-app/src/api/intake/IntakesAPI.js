import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchIntakes: ({ filters, sorts, pagination }) => {
        const URL_INTAKES = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKES}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekIntakes: () => {
        const URL_INTAKES = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKES}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekIntakesForContacts: contactIds => {
        const URL_INTAKES = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKES}/peek`;

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

    fetchIntakesByContact: contactId => {
        const requestUrl = `${getApiUrl()}/api/contact/${contactId}/intakes`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getAmountActive: () => {
        const URL_INTAKES = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKES}/amount-active`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getExcel: ({ filters, sorts }) => {
        const URL_INTAKES = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKES}/excel`;
        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                withOpportunities: false,
            },
            responseType: 'blob',
        });
    },

    getExcelWithOpportunities: ({ filters, sorts }) => {
        const URL_INTAKES = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKES}/excel`;
        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                withOpportunities: true,
            },
            responseType: 'blob',
        });
    },
};
