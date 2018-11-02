export const setNumberFilterOrders = (number) => ({
    type: 'SET_NUMBER_FILTER_ORDERS',
    number,
});

export const setDateNextInvoiceFilterOrders = (dateNextInvoice) => ({
    type: 'SET_DATE_NEXT_INVOICE_FILTER_ORDERS',
    dateNextInvoice,
});

export const setSubjectFilterOrders = (subject) => ({
    type: 'SET_SUBJECT_FILTER_ORDERS',
    subject,
});

export const setContactFilterOrders = (contact) => ({
    type: 'SET_CONTACT_FILTER_ORDERS',
    contact,
});

export const setPaymentTypeIdFilterOrders = (paymentTypeId) => ({
    type: 'SET_PAYMENT_TYPE_ID_FILTER_ORDERS',
    paymentTypeId,
});

export const setStatusIdFilterOrders = (statusId) => ({
    type: 'SET_STATUS_ID_FILTER_ORDERS',
    statusId,
});

export const clearFilterOrders = () => ({
    type: 'CLEAR_FILTER_ORDERS',
});

