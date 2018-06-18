export const setNumberFilterPaymentInvoices = (number) => ({
    type: 'SET_NUMBER_FILTER_PAYMENT_INVOICES',
    number,
});

export const setContactFilterPaymentInvoices = (contact) => ({
    type: 'SET_CONTACT_FILTER_PAYMENT_INVOICES',
    contact,
});

export const setStatusIdFilterPaymentInvoices = (statusId) => ({
    type: 'SET_STATUS_ID_FILTER_PAYMENT_INVOICES',
    statusId,
});

export const setPayoutFilterPaymentInvoices = (payout) => ({
    type: 'SET_PAYOUT_FILTER_PAYMENT_INVOICES',
    payout,
});

export const clearFilterPaymentInvoices = () => ({
    type: 'CLEAR_FILTER_PAYMENT_INVOICES',
});

