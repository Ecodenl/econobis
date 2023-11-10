export const fetchOrders = (filters, sorts, pagination, administrationId, showOrdersWithoutOrderlines = true) => {
    return {
        type: 'FETCH_ORDERS',
        filters,
        sorts,
        pagination,
        administrationId,
        showOrdersWithoutOrderlines,
    };
};

export const clearOrders = () => {
    return {
        type: 'CLEAR_ORDERS',
    };
};

export const deleteOrder = id => {
    return {
        type: 'DELETE_ORDER',
        id,
    };
};

export const previewCreate = data => {
    return {
        type: 'ORDER_PREVIEW_CREATE',
        data,
    };
};

export const clearPreviewCreate = () => {
    return {
        type: 'CLEAR_ORDER_PREVIEW_CREATE',
    };
};
