import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchProductDetails: function(id) {
        const URL_PRODUCT = `${getApiUrl()}/api/product`;
        const requestUrl = `${URL_PRODUCT}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newProduct: product => {
        const URL_PRODUCT = `${getApiUrl()}/api/product`;
        const requestUrl = `${URL_PRODUCT}`;

        return getAxiosInstance()
            .post(requestUrl, product)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateProduct: ({ product }) => {
        const URL_PRODUCT = `${getApiUrl()}/api/product`;
        const requestUrl = `${URL_PRODUCT}/${product.id}`;

        return getAxiosInstance()
            .post(requestUrl, product)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteProduct: id => {
        const URL_PRODUCT = `${getApiUrl()}/api/product`;
        const requestUrl = `${URL_PRODUCT}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    newPriceHistory: priceHistory => {
        const URL_PRODUCT = `${getApiUrl()}/api/product`;
        const requestUrl = `${URL_PRODUCT}/price-history`;

        return getAxiosInstance().post(requestUrl, priceHistory);
    },
};
