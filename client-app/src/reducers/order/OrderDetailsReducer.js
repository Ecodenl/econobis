export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_ORDER_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.orderDetails,
            };
        case 'UPDATE_ORDER_SUCCESS':
            return {
                ...state,
                ...action.orderDetails,
            };
        default:
            return state;
    }
}
