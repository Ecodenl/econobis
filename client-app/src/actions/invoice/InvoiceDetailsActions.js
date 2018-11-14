export const fetchInvoiceDetails = (id) => {
    return {
        type: 'FETCH_INVOICE_DETAILS',
        id,
    }
};

export const deleteInvoice = (id) => {
    return {
        type: 'DELETE_INVOICE',
        id
    }
};