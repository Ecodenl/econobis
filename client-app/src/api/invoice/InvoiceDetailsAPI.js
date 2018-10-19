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

    updateInvoice: (invoice) => {
        const requestUrl = `${URL_INVOICE}/${invoice.id}`;
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

    sendNotification: (invoiceId) => {
        const requestUrl = `${URL_INVOICE}/${invoiceId}/send-notification`;
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

    setIrrecoverable: (invoiceId) => {
        const requestUrl = `${URL_INVOICE}/${invoiceId}/irrecoverable`;
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

    send: (invoiceId, dateCollection) => {
        const requestUrl = `${URL_INVOICE}/${invoiceId}/send`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, {'dateCollection': dateCollection})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    sendPost: (invoiceId, dateCollection) => {
        const requestUrl = `${URL_INVOICE}/${invoiceId}/send-post`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, {'dateCollection': dateCollection}, {responseType: 'blob'});
    },

    sendAll: (invoiceIds, dateCollection) => {
        const requestUrl = `${URL_INVOICE}/send-all`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        document.body.style.cursor='wait';

        let response = axios.post(requestUrl, {'ids': invoiceIds, 'dateCollection': dateCollection} , {responseType: 'blob'});

        document.body.style.cursor='default';

        return response;
    },

    sendAllPost: (invoiceIds, dateCollection) => {
        const requestUrl = `${URL_INVOICE}/send-all-post`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        document.body.style.cursor='wait';
        let response = axios.post(requestUrl, {'ids': invoiceIds, 'dateCollection': dateCollection} , {responseType: 'blob'});
        document.body.style.cursor='default';
        return response;
    },

    createSepaForInvoiceIds: (invoiceIds) => {
        const requestUrl = `${URL_INVOICE}/create-sepa-for-invoice-ids`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        document.body.style.cursor='wait';
        let response = axios.post(requestUrl, {'ids': invoiceIds}, {responseType: 'blob'});
        document.body.style.cursor='default';
        return response;
    },

    getAllPost: (administrationId) => {
        const requestUrl = `${URL_INVOICE}/${administrationId}/get-all-post`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        document.body.style.cursor='wait';
        return axios.get(requestUrl)
            .then(function (response) {
                document.body.style.cursor='default';
                return response.data;
            })
            .catch(function (error) {
                document.body.style.cursor='default';
                console.log(error);
            });
    },

    createSepa: (administrationId) => {
        const requestUrl = `${URL_INVOICE}/${administrationId}/create-sepa`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {responseType: 'blob'});
    },

    newPayment: (payment) => {
        const requestUrl = `${URL_INVOICE}/${payment.invoiceId}/payment/new`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, payment)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updatePayment: (payment) => {
        const requestUrl = `${URL_INVOICE}/${payment.id}/payment/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, payment)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    deletePayment: (paymentId) => {
        const requestUrl = `${URL_INVOICE}/payment/${paymentId}/delete`;
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

    deleteInvoiceProduct: (invoiceProductId) => {
        const requestUrl = `${URL_INVOICE}/invoice-product/${invoiceProductId}/delete`;
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

    download: (id) => {
        const requestUrl = `${URL_INVOICE}/${id}/download`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {responseType: 'blob'});
    },

    getEmailPreview: (id) => {
        const requestUrl = `${URL_INVOICE}/${id}/email-preview`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    newInvoiceProduct: (invoiceProduct) => {
        const requestUrl = `${URL_INVOICE}/invoice-product`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, invoiceProduct);
    },

    newProductAndInvoiceProduct: (invoiceProduct, product) => {
        const requestUrl = `${URL_INVOICE}/product-and-invoice-product`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, {'invoiceProduct': invoiceProduct, 'product': product});
    },

    updateInvoiceProduct: (invoiceProduct) => {
        const requestUrl = `${URL_INVOICE}/invoice-product/${invoiceProduct.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, invoiceProduct);
    },

};