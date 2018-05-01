export const fetchProducts = () => {
    return {
        type: 'FETCH_PRODUCTS',
    };
};

export const clearProducts = () => {
    return {
        type: 'CLEAR_PRODUCTS'
    };
};

export const deleteProduct = (id) => {
    return  {
        type: 'DELETE_PRODUCT',
        id,
    };
};

