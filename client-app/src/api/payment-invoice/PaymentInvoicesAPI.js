import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_PAYMENT_INVOICE = `${URL_API}/api/payment-invoice`;

export default {
    fetchInvoices: ({ filters, sorts, pagination, administrationId }) => {
        const requestUrl = `${URL_PAYMENT_INVOICE}/grid`;
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


    setNotPaid: (invoiceId) => {
        const requestUrl = `${URL_PAYMENT_INVOICE}/${invoiceId}/not-paid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    createSepa: (administrationId) => {
        const requestUrl = `${URL_PAYMENT_INVOICE}/${administrationId}/create-sepa`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response)
            .catch((error) => {
                    console.log(error);
                },
            );
    },
};
