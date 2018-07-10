import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_INVOICE = `${URL_API}/api/invoice`;

export default {
    fetchInvoices: ({ filters, sorts, pagination, administrationId }) => {
        const requestUrl = `${URL_INVOICE}/grid`;
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

    peekInvoices: () => {
        const requestUrl = `${URL_INVOICE}/peek`;
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
        const requestUrl = `${URL_INVOICE}/csv`;
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

    getUnpaidInvoices: () => {
        const requestUrl = `${URL_INVOICE}/amount-unpaid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    getInvoicesForSending: (ids) => {
        const requestUrl = `${URL_INVOICE}/sending`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, {'ids': ids})
            .then(response => response.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },
};
