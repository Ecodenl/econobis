import axiosInstance from '../default-setup/AxiosInstance';

const URL_ORDER = `${URL_API}/api/order`;

export default {
    fetchOrderDetails: function(id) {
        const requestUrl = `${URL_ORDER}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newOrder: order => {
        const requestUrl = `${URL_ORDER}`;

        return axiosInstance
            .post(requestUrl, order)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateOrder: ({ order }) => {
        const requestUrl = `${URL_ORDER}/${order.id}`;

        return axiosInstance
            .post(requestUrl, order)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteOrder: id => {
        const requestUrl = `${URL_ORDER}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    newOrderProduct: orderProduct => {
        const requestUrl = `${URL_ORDER}/order-product`;

        return axiosInstance.post(requestUrl, orderProduct);
    },

    newProductAndOrderProduct: (orderProduct, product) => {
        const requestUrl = `${URL_ORDER}/product-and-order-product`;

        return axiosInstance.post(requestUrl, { orderProduct: orderProduct, product: product });
    },

    updateOrderProductOneTime: (orderProduct, product) => {
        const requestUrl = `${URL_ORDER}/product-and-order-product/update`;

        return axiosInstance.post(requestUrl, { orderProduct: orderProduct, product: product });
    },

    deleteOrderProduct: orderProductId => {
        const requestUrl = `${URL_ORDER}/order-product/${orderProductId}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateOrderProduct: orderProduct => {
        const requestUrl = `${URL_ORDER}/order-product/${orderProduct.id}/update`;

        return axiosInstance.post(requestUrl, orderProduct);
    },

    fetchContactInfoForOrder: function(contactId) {
        const requestUrl = `${URL_ORDER}/${contactId}/contact-info-for-order`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    downloadPreview: id => {
        const requestUrl = `${URL_ORDER}/${id}/download-preview`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },

    createAll: orderIds => {
        const requestUrl = `${URL_ORDER}/create-all`;

        return axiosInstance
            .post(requestUrl, { orderIds: orderIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getEmailPreview: id => {
        const requestUrl = `${URL_ORDER}/${id}/email-preview`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
