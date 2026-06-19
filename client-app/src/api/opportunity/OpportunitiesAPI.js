import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchOpportunities: ({ filters, sorts, pagination }) => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekOpportunities: () => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekOpportunitiesForContacts: contactIds => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/peek`;

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
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/amount-active`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getChartData: () => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/chart-data`;

        return getAxiosInstance().get(requestUrl);
    },

    getCSV: ({ filters, sorts }) => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/csv`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },
};
