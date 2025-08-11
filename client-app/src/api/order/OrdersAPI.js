import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchOrders: ({ filters, sorts, pagination, administrationId, showOnlyOrdersWithOrderProducts }) => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/grid`;

        return getAxiosInstance().get(requestUrl, {
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
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekOrdersForContacts: contactIds => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/peek`;

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

    getCSV: ({ filters, sorts, administrationId }) => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/csv`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getCSVWithProducts: ({ filters, sorts, administrationId }) => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/csvwithproducts`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getCollectionOrders: () => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/amount-collection`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getOrdersForCreating: ids => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/creating`;

        return getAxiosInstance()
            .post(requestUrl, { ids: ids })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
