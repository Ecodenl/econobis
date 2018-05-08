import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_INVOICE = `${URL_API}/api/invoice`;

export default {
    fetchInvoiceDetails: function (id) {
        const requestUrl = `${URL_INVOICE}/${id}`;
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

    newInvoice: (invoice) => {
        const requestUrl = `${URL_INVOICE}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, invoice)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};