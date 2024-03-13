import axiosInstance from '../default-setup/AxiosInstance';

const URL_INVOICE_POST = `invoice-post`;

export default {
    fetchInvoicePosts: administrationId => {
        const requestUrl = `${URL_INVOICE_POST}/grid`;
        return axiosInstance.get(requestUrl, {
            params: {
                administrationId: JSON.stringify(administrationId),
            },
        });
    },

    // deleteInvoicePost: invoicePostId => {
    //     const requestUrl = `${URL_INVOICE_POST}/${invoicePostId}/delete`;
    //
    //     return axiosInstance.post(requestUrl);
    // },

    download: invoicePostId => {
        const requestUrl = `${URL_INVOICE_POST}/${invoicePostId}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
