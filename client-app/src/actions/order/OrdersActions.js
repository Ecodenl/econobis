export const fetchOrders = () => {
    return {
        type: 'FETCH_ORDERS',
    };
};

export const clearOrders = () => {
    return {
        type: 'CLEAR_ORDERS'
    };
};

export const deleteOrder = (id) => {
    return  {
        type: 'DELETE_ORDER',
        id,
    };
};

