export const fetchOrders = (filters, sorts, pagination, administrationId) => {
    return {
        type: 'FETCH_ORDERS',
        filters,
        sorts,
        pagination,
        administrationId,
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

