export const fetchInvoiceDetails = id => {
    return {
        type: 'FETCH_INVOICE_DETAILS',
        id,
    };
};

export const fetchInvoiceFromTwinfieldDetails = (twinfieldCode, twinfieldNumber) => {
    return {
        type: 'FETCH_INVOICE_FROM_TWINFIELD_DETAILS',
        twinfieldCode,
        twinfieldNumber,
    };
};

export const deleteInvoice = id => {
    return {
        type: 'DELETE_INVOICE',
        id,
    };
};
