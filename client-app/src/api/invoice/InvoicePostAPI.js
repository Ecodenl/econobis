import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_INVOICE_POST = `invoice-post`;

export default {
    fetchInvoicePosts: administrationId => {
        const requestUrl = `${URL_INVOICE_POST}/grid`;
        return getAxiosInstance().get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
            },
        });
    },

    // deleteInvoicePost: invoicePostId => {
    //     const requestUrl = `${URL_INVOICE_POST}/${invoicePostId}/delete`;
    //
    //     return getAxiosInstance().post(requestUrl);
    // },

    download: invoicePostId => {
        const requestUrl = `${URL_INVOICE_POST}/${invoicePostId}/download`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },
};
