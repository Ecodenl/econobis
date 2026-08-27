export const fetchIntakes = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_INTAKES',
        filters,
        sorts,
        pagination,
    };
};

export const clearIntakes = () => {
    return {
        type: 'CLEAR_INTAKES',
    };
};
