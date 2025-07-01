import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchOrderDetails: function(id) {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newOrder: order => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}`;

        return getAxiosInstance()
            .post(requestUrl, order)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateOrder: ({ order }) => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/${order.id}`;

        return getAxiosInstance()
            .post(requestUrl, order)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteOrder: id => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    newOrderProduct: orderProduct => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/order-product`;

        return getAxiosInstance().post(requestUrl, orderProduct);
    },

    newProductAndOrderProduct: (orderProduct, product) => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/product-and-order-product`;

        return getAxiosInstance().post(requestUrl, { orderProduct: orderProduct, product: product });
    },

    updateOrderProductOneTime: (orderProduct, product) => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/product-and-order-product/update`;

        return getAxiosInstance().post(requestUrl, { orderProduct: orderProduct, product: product });
    },

    deleteOrderProduct: orderProductId => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/order-product/${orderProductId}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateOrderProduct: orderProduct => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/order-product/${orderProduct.id}/update`;

        return getAxiosInstance().post(requestUrl, orderProduct);
    },

    fetchContactInfoForOrder: function(contactId) {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/${contactId}/contact-info-for-order`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    downloadPreview: id => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/${id}/download-preview`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },

    createAll: orderIds => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/create-all`;

        return getAxiosInstance()
            .post(requestUrl, { orderIds: orderIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getEmailPreview: id => {
        const URL_ORDER = `${getApiUrl()}/api/order`;
        const requestUrl = `${URL_ORDER}/${id}/email-preview`;

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
