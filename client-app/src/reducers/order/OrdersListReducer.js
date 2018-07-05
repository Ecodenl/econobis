export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_ORDERS_SUCCESS':
            return {
                data: action.orders.data.data,
                meta: {
                    total: action.orders.data.meta.total,
                },
            };
        case 'CLEAR_ORDERS':
            return {
                ...state,
                data: [],
                meta: {},
            };
        case 'DELETE_ORDER_SUCCESS':
            return {
                ...state,
                data: state.data.filter((order) => order.id !== action.id)
            };
        default:
            return state;
    }
}