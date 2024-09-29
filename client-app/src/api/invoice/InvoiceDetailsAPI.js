import axiosInstance from '../default-setup/AxiosInstance';

const URL_INVOICE = `${URL_API}/api/invoice`;

export default {
    fetchInvoiceDetails: function(id) {
        const requestUrl = `${URL_INVOICE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchInvoiceFromTwinfieldDetails: function(twinfieldCode, twinfieldNumber) {
        const requestUrl = `${URL_INVOICE}/from-twinfield?twinfieldCode=${twinfieldCode}&twinfieldNumber=${twinfieldNumber}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newInvoice: invoice => {
        const requestUrl = `${URL_INVOICE}`;

        return axiosInstance
            .post(requestUrl, invoice)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateInvoice: invoice => {
        const requestUrl = `${URL_INVOICE}/${invoice.id}`;

        return axiosInstance
            .post(requestUrl, invoice)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    setInvoicesPaid: (invoiceIds, datePaid, paymentReference) => {
        const requestUrl = `${URL_INVOICE}/set-multiple-paid`;

        document.body.style.cursor = 'wait';

        let response = axiosInstance.post(requestUrl, {
            ids: invoiceIds,
            datePaid: datePaid,
            paymentReference: paymentReference,
        });

        document.body.style.cursor = 'default';

        return response;
    },

    sendNotification: invoiceId => {
        const requestUrl = `${URL_INVOICE}/${invoiceId}/send-notification`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    sendNotifications: invoiceIds => {
        const requestUrl = `${URL_INVOICE}/send-notifications`;

        return axiosInstance
            .post(requestUrl, { ids: invoiceIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    sendNotificationsPost: invoiceIds => {
        const requestUrl = `${URL_INVOICE}/send-notifications-post`;

        document.body.style.cursor = 'wait';
        let response = axiosInstance.post(requestUrl, { ids: invoiceIds }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    sendNotificationPost: invoiceId => {
        const requestUrl = `${URL_INVOICE}/${invoiceId}/send-notification-post`;

        document.body.style.cursor = 'wait';
        let response = axiosInstance.post(requestUrl, {}, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    setIrrecoverable: invoiceId => {
        const requestUrl = `${URL_INVOICE}/${invoiceId}/irrecoverable`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    syncOneInvoiceFromTwinfield: (administrationId, invoiceId) => {
        const requestUrl = `${URL_INVOICE}/${invoiceId}/sync-one-invoice-from-twinfield`;

        return axiosInstance.post(requestUrl, {
            administrationId: administrationId,
        });
    },

    sendAll: (invoiceIds, dateCollection) => {
        const requestUrl = `${URL_INVOICE}/send-all`;

        document.body.style.cursor = 'wait';

        let response = axiosInstance.post(
            requestUrl,
            { ids: invoiceIds, dateCollection: dateCollection },
            { responseType: 'blob' }
        );

        document.body.style.cursor = 'default';

        return response;
    },

    sendAllPost: (administrationId, invoiceIds, dateCollection) => {
        const requestUrl = `${URL_INVOICE}/${administrationId}/send-all-post`;

        document.body.style.cursor = 'wait';
        let response = axiosInstance.post(
            requestUrl,
            { ids: invoiceIds, dateCollection: dateCollection },
            { responseType: 'blob' }
        );
        document.body.style.cursor = 'default';
        return response;
    },

    createSepaForInvoiceIds: invoiceIds => {
        const requestUrl = `${URL_INVOICE}/create-sepa-for-invoice-ids`;

        document.body.style.cursor = 'wait';
        let response = axiosInstance.post(requestUrl, { ids: invoiceIds }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    newPayment: payment => {
        const requestUrl = `${URL_INVOICE}/${payment.invoiceId}/payment/new`;

        return axiosInstance
            .post(requestUrl, payment)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updatePayment: payment => {
        const requestUrl = `${URL_INVOICE}/${payment.id}/payment/update`;

        return axiosInstance
            .post(requestUrl, payment)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deletePayment: paymentId => {
        const requestUrl = `${URL_INVOICE}/payment/${paymentId}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteInvoiceProduct: invoiceProductId => {
        const requestUrl = `${URL_INVOICE}/invoice-product/${invoiceProductId}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    download: id => {
        const requestUrl = `${URL_INVOICE}/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },

    getEmailPreview: id => {
        const requestUrl = `${URL_INVOICE}/${id}/email-preview`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newInvoiceProduct: invoiceProduct => {
        const requestUrl = `${URL_INVOICE}/invoice-product`;

        return axiosInstance.post(requestUrl, invoiceProduct);
    },

    newProductAndInvoiceProduct: (invoiceProduct, product) => {
        const requestUrl = `${URL_INVOICE}/product-and-invoice-product`;

        return axiosInstance.post(requestUrl, { invoiceProduct: invoiceProduct, product: product });
    },

    updateInvoiceProduct: invoiceProduct => {
        const requestUrl = `${URL_INVOICE}/invoice-product/${invoiceProduct.id}/update`;

        return axiosInstance.post(requestUrl, invoiceProduct);
    },

    deleteInvoice: id => {
        const requestUrl = `${URL_INVOICE}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
