export const fetchProducts = (filters, filterType) => {
    return {
        type: 'FETCH_PRODUCTS',
        filters,
        filterType,
    };
};

export const clearProducts = () => {
    return {
        type: 'CLEAR_PRODUCTS',
    };
};

export const deleteProduct = id => {
    return {
        type: 'DELETE_PRODUCT',
        id,
    };
};
