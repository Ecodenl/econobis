import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_ORDER = `${URL_API}/api/order`;

export default {
    fetchOrders: () => {
        const requestUrl = `${URL_ORDER}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    peekOrders: () => {
        const requestUrl = `${URL_ORDER}/peek`;
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
