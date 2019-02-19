export const fetchPaymentInvoices = (filters, sorts, pagination, administrationId) => {
    return {
        type: 'FETCH_PAYMENT_INVOICES',
        filters,
        sorts,
        pagination,
        administrationId,
    };
};

export const clearPaymentInvoices = () => {
    return {
        type: 'CLEAR_PAYMENT_INVOICES',
    };
};
