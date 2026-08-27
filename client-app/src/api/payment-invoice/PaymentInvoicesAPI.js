import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchInvoices: ({ filters, sorts, pagination, administrationId }) => {
        const URL_PAYMENT_INVOICE = `${getApiUrl()}/api/payment-invoice`;
        const requestUrl = `${URL_PAYMENT_INVOICE}/grid`;

        return getAxiosInstance().get(requestUrl, {
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
        const URL_PAYMENT_INVOICE = `${getApiUrl()}/api/payment-invoice`;
        const requestUrl = `${URL_PAYMENT_INVOICE}/${invoiceId}/not-paid`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
