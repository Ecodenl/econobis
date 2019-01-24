export const fetchOrderDetails = id => {
    return {
        type: 'FETCH_ORDER_DETAILS',
        id,
    };
};

export const updateOrder = (order, switchToView) => {
    return {
        type: 'UPDATE_ORDER',
        order,
        switchToView,
    };
};
