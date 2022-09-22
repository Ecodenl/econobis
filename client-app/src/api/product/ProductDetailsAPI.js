import axiosInstance from '../default-setup/AxiosInstance';

const URL_PRODUCT = `${URL_API}/api/product`;

export default {
    fetchProductDetails: function(id) {
        const requestUrl = `${URL_PRODUCT}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newProduct: product => {
        const requestUrl = `${URL_PRODUCT}`;

        return axiosInstance
            .post(requestUrl, product)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateProduct: ({ product }) => {
        const requestUrl = `${URL_PRODUCT}/${product.id}`;

        return axiosInstance
            .post(requestUrl, product)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteProduct: id => {
        const requestUrl = `${URL_PRODUCT}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    newPriceHistory: priceHistory => {
        const requestUrl = `${URL_PRODUCT}/price-history`;

        return axiosInstance.post(requestUrl, priceHistory);
    },
};
