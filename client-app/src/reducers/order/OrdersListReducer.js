export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_ORDERS_SUCCESS':
            return [
                ...state,
                ...action.orders.data.data
            ];
        case 'CLEAR_ORDERS':
            return state.orders = [];
        case 'DELETE_ORDER_SUCCESS':
            return state.filter((order) => order.id !== action.id);
        default:
            return state;
    }
}