export const fetchOpportunities = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_OPPORTUNITIES',
        filters,
        sorts,
        pagination,
    };
};

export const clearOpportunities = () => {
    return {
        type: 'CLEAR_OPPORTUNITIES',
    };
};
