import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchInvoices: ({
        filters,
        sorts,
        pagination,
        administrationId,
        onlyEmailInvoices,
        onlyPostInvoices,
        setInvoicesPaid,
    }) => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                onlyEmailInvoices: JSON.stringify(onlyEmailInvoices),
                onlyPostInvoices: JSON.stringify(onlyPostInvoices),
                setInvoicesPaid: JSON.stringify(setInvoicesPaid),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekInvoices: () => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getCSV: ({ filters, sorts, administrationId }) => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/csv`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getCSVWithProducts: ({ filters, sorts, administrationId }) => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/csvwithproducts`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getUnpaidInvoices: () => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/amount-unpaid`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getInvoicesForSending: ids => {
        const URL_INVOICE = `${getApiUrl()}/api/invoice`;
        const requestUrl = `${URL_INVOICE}/sending`;

        return getAxiosInstance()
            .post(requestUrl, { ids: ids })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
