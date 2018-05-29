import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_ORDER = `${URL_API}/api/order`;

export default {
    fetchOrders: ({ filters, sorts, pagination, administrationId }) => {
        const requestUrl = `${URL_ORDER}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
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

    getCSV: ({ filters, sorts, administrationId }) => {
        const requestUrl = `${URL_ORDER}/csv`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getCollectionOrders: () => {
        const requestUrl = `${URL_ORDER}/amount-collection`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },
};
