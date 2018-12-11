import axios from 'axios';

const URL_PRODUCT = `${URL_API}/api/product`;

export default {
    fetchProductDetails: function (id) {
        const requestUrl = `${URL_PRODUCT}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },

    newProduct: (product) => {
        const requestUrl = `${URL_PRODUCT}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, product)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateProduct: ({product}) => {
        const requestUrl = `${URL_PRODUCT}/${product.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, product)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    deleteProduct: (id) => {
        const requestUrl = `${URL_PRODUCT}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    newPriceHistory: (priceHistory) => {
        const requestUrl = `${URL_PRODUCT}/price-history`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, priceHistory);
    },
};