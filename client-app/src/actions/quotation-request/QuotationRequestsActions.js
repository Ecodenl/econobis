export const fetchQuotationRequests = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_QUOTATION_REQUESTS',
        filters,
        sorts,
        pagination,
    };
};

export const clearQuotationRequests = () => {
    return {
        type: 'CLEAR_QUOTATION_REQUESTS'
    };
};