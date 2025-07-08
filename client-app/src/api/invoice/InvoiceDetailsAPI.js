import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchInvoiceDetails: function(id) {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchInvoiceFromTwinfieldDetails: function(twinfieldCode, twinfieldNumber) {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/from-twinfield?twinfieldCode=${twinfieldCode}&twinfieldNumber=${twinfieldNumber}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newInvoice: invoice => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}`;

        return getAxiosInstance()
            .post(requestUrl, invoice)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateInvoice: invoice => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${invoice.id}`;

        return getAxiosInstance()
            .post(requestUrl, invoice)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    setInvoicesPaid: (invoiceIds, datePaid, paymentReference) => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/set-multiple-paid`;

        document.body.style.cursor = 'wait';

        let response = getAxiosInstance().post(requestUrl, {
            ids: invoiceIds,
            datePaid: datePaid,
            paymentReference: paymentReference,
        });

        document.body.style.cursor = 'default';

        return response;
    },

    sendNotification: invoiceId => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${invoiceId}/send-notification`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    sendNotifications: invoiceIds => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/send-notifications`;

        return getAxiosInstance()
            .post(requestUrl, { ids: invoiceIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    sendNotificationsPost: invoiceIds => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/send-notifications-post`;

        document.body.style.cursor = 'wait';
        let response = getAxiosInstance().post(requestUrl, { ids: invoiceIds }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    sendNotificationPost: invoiceId => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${invoiceId}/send-notification-post`;

        document.body.style.cursor = 'wait';
        let response = getAxiosInstance().post(requestUrl, {}, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    setIrrecoverable: invoiceId => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${invoiceId}/irrecoverable`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    syncOneInvoiceFromTwinfield: (administrationId, invoiceId) => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${invoiceId}/sync-one-invoice-from-twinfield`;

        return getAxiosInstance().post(requestUrl, {
            administrationId: administrationId,
        });
    },

    sendAll: (invoiceIds, dateCollection) => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/send-all`;

        document.body.style.cursor = 'wait';

        let response = getAxiosInstance().post(
            requestUrl,
            { ids: invoiceIds, dateCollection: dateCollection },
            { responseType: 'blob' }
        );

        document.body.style.cursor = 'default';

        return response;
    },

    sendAllPost: (administrationId, invoiceIds, dateCollection) => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${administrationId}/send-all-post`;

        document.body.style.cursor = 'wait';
        let response = getAxiosInstance().post(
            requestUrl,
            { ids: invoiceIds, dateCollection: dateCollection },
            { responseType: 'blob' }
        );
        document.body.style.cursor = 'default';
        return response;
    },

    createSepaForInvoiceIds: invoiceIds => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/create-sepa-for-invoice-ids`;

        document.body.style.cursor = 'wait';
        let response = getAxiosInstance().post(requestUrl, { ids: invoiceIds }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    newPayment: payment => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${payment.invoiceId}/payment/new`;

        return getAxiosInstance()
            .post(requestUrl, payment)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updatePayment: payment => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${payment.id}/payment/update`;

        return getAxiosInstance()
            .post(requestUrl, payment)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deletePayment: paymentId => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/payment/${paymentId}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteInvoiceProduct: invoiceProductId => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/invoice-product/${invoiceProductId}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    download: id => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${id}/download`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },

    getEmailPreview: id => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${id}/email-preview`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newInvoiceProduct: invoiceProduct => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/invoice-product`;

        return getAxiosInstance().post(requestUrl, invoiceProduct);
    },

    newProductAndInvoiceProduct: (invoiceProduct, product) => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/product-and-invoice-product`;

        return getAxiosInstance().post(requestUrl, { invoiceProduct: invoiceProduct, product: product });
    },

    updateInvoiceProduct: invoiceProduct => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/invoice-product/${invoiceProduct.id}/update`;

        return getAxiosInstance().post(requestUrl, invoiceProduct);
    },

    deleteInvoice: id => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
