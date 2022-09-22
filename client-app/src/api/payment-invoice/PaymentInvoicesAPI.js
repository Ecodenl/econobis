import axiosInstance from '../default-setup/AxiosInstance';

const URL_PAYMENT_INVOICE = `${URL_API}/api/payment-invoice`;

export default {
    fetchInvoices: ({ filters, sorts, pagination, administrationId }) => {
        const requestUrl = `${URL_PAYMENT_INVOICE}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    setNotPaid: invoiceId => {
        const requestUrl = `${URL_PAYMENT_INVOICE}/${invoiceId}/not-paid`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
