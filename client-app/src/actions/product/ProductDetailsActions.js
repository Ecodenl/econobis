export const fetchProductDetails = (id) => {
    return {
        type: 'FETCH_PRODUCT_DETAILS',
        id,
    }
};

export const updateProduct = (product, switchToView) => {
    return {
        type: 'UPDATE_PRODUCT',
        product,
        switchToView,
    }
};

export const addProductPriceHistoryUser = (priceHistory) => {
    return {
        type: 'ADD_PRODUCT_PRICE_HISTORY',
        priceHistory,
    };
};