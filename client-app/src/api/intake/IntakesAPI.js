import axiosInstance from '../default-setup/AxiosInstance';

const URL_INTAKES = `${URL_API}/api/intake`;

export default {
    fetchIntakes: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_INTAKES}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekIntakes: () => {
        const requestUrl = `${URL_INTAKES}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekIntakesForContacts: (contactIds) => {
        const requestUrl = `${URL_INTAKES}/peek`;

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

    fetchIntakesByContact: contactId => {
        const requestUrl = `${URL_API}/api/contact/${contactId}/intakes`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getAmountActive: () => {
        const requestUrl = `${URL_INTAKES}/amount-active`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getExcel: ({ filters, sorts }) => {
        const requestUrl = `${URL_INTAKES}/excel`;
        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                withOpportunities: false,
            },
            responseType: 'blob',
        });
    },

    getExcelWithOpportunities: ({ filters, sorts }) => {
        const requestUrl = `${URL_INTAKES}/excel`;
        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                withOpportunities: true,
            },
            responseType: 'blob',
        });
    },
};
