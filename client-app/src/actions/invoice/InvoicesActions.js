export const fetchInvoices = (filters, sorts, pagination, administrationId) => {
    return {
        type: 'FETCH_INVOICES',
        filters,
        sorts,
        pagination,
        administrationId,
    };
};

export const clearInvoices = () => {
    return {
        type: 'CLEAR_INVOICES'
    };
};

