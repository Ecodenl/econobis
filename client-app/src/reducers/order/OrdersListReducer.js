export default function(state = [], action) {
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
        case 'SET_CHECKED_ORDER':
            return {
                ...state,
                data: state.data.map(order => {
                    if (order.id === action.id) {
                        return {
                            ...order,
                            checked: !order.checked,
                        };
                    } else {
                        return order;
                    }
                }),
            };
        case 'SET_CHECKED_ORDER_ALL':
            return {
                ...state,
                data: state.data.map(order => {
                    return {
                        ...order,
                        checked: action.checkedValue,
                    };
                }),
            };

        case 'DELETE_ORDER_SUCCESS':
            return {
                ...state,
                data: state.data.filter(order => order.id !== action.id),
            };
        default:
            return state;
    }
}
