import axiosInstance from '../default-setup/AxiosInstance';

const URL_INVOICE = `${URL_API}/api/invoice`;

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
        const requestUrl = `${URL_INVOICE}/grid`;

        return axiosInstance.get(requestUrl, {
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
        const requestUrl = `${URL_INVOICE}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getCSV: ({ filters, sorts, administrationId }) => {
        const requestUrl = `${URL_INVOICE}/csv`;

        return axiosInstance.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getCSVWithProducts: ({ filters, sorts, administrationId }) => {
        const requestUrl = `${URL_INVOICE}/csvwithproducts`;

        return axiosInstance.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },

    getUnpaidInvoices: () => {
        const requestUrl = `${URL_INVOICE}/amount-unpaid`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getInvoicesForSending: ids => {
        const requestUrl = `${URL_INVOICE}/sending`;

        return axiosInstance
            .post(requestUrl, { ids: ids })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
