import axiosInstance from '../default-setup/AxiosInstance';

const URL_OPPORTUNITY = `${URL_API}/api/opportunity`;

export default {
    fetchOpportunities: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_OPPORTUNITY}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekOpportunities: () => {
        const requestUrl = `${URL_OPPORTUNITY}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekOpportunitiesForContacts: (contactIds) => {
        const requestUrl = `${URL_OPPORTUNITY}/peek`;

        return axiosInstance
            .get(requestUrl, {
                params: {
                    contactIds: JSON.stringify(contactIds),
                }
            })
            .then(function(response) {
                return response.data.data;
            });
    },

    getAmountActive: () => {
        const requestUrl = `${URL_OPPORTUNITY}/amount-active`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getChartData: () => {
        const requestUrl = `${URL_OPPORTUNITY}/chart-data`;

        return axiosInstance.get(requestUrl);
    },

    getCSV: ({ filters, sorts }) => {
        const requestUrl = `${URL_OPPORTUNITY}/csv`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },
};
