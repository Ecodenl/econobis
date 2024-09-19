import axiosInstance from '../default-setup/AxiosInstance';

const URL_ORDER = `${URL_API}/api/order`;

export default {
    fetchOrders: ({ filters, sorts, pagination, administrationId, showOnlyOrdersWithOrderProducts }) => {
        const requestUrl = `${URL_ORDER}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                showOnlyOrdersWithOrderProducts: showOnlyOrdersWithOrderProducts,
            },
        });
    },

    peekOrders: () => {
        const requestUrl = `${URL_ORDER}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekOrdersForContacts: contactIds => {
        const requestUrl = `${URL_ORDER}/peek`;

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

    getCSV: ({ filters, sorts, administrationId }) => {
        const requestUrl = `${URL_ORDER}/csv`;

        return axiosInstance.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getCSVWithProducts: ({ filters, sorts, administrationId }) => {
        const requestUrl = `${URL_ORDER}/csvwithproducts`;

        return axiosInstance.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getCollectionOrders: () => {
        const requestUrl = `${URL_ORDER}/amount-collection`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getOrdersForCreating: ids => {
        const requestUrl = `${URL_ORDER}/creating`;

        return axiosInstance
            .post(requestUrl, { ids: ids })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
