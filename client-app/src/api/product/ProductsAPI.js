import axios from 'axios';

const URL_PRODUCT = `${URL_API}/api/product`;

export default {
    fetchProducts: () => {
        const requestUrl = `${URL_PRODUCT}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    peekProducts: () => {
        const requestUrl = `${URL_PRODUCT}/peek`;
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
};
