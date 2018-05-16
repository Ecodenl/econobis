export const fetchInvoiceDetails = (id) => {
    return {
        type: 'FETCH_INVOICE_DETAILS',
        id,
    }
};