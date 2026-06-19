export const fetchAddressDongles = (filters, extraFilters, sorts, pagination) => {
    return {
        type: 'FETCH_ADDRESS_DONGLES',
        filters,
        extraFilters,
        sorts,
        pagination,
    };
};

export const clearAddressDongles = () => {
    return {
        type: 'CLEAR_ADDRESS_DONGLES',
    };
};
