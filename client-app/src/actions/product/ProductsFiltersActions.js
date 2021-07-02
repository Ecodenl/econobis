// SET_PRODUCT_CODE_FILTER
export const setProductCodeFilter = code => ({
    type: 'SET_PRODUCT_CODE_FILTER',
    code,
});

// SET_PRODUCT_FILTER
export const setProductFilter = name => ({
    type: 'SET_PRODUCT_FILTER',
    name,
});

// SET_ACTIVE_PRODUCT_FILTER
export const setActiveProductFilter = active => ({
    type: 'SET_ACTIVE_PRODUCT_FILTER',
    active,
});

// CLEAR_FILTER_PRODUCTS
export const clearFilterProducts = () => ({
    type: 'CLEAR_FILTER_PRODUCTS',
});
