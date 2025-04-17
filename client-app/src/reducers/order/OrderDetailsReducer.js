export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_ORDER_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.orderDetails,
                deleteSuccess: false,
            };
        case 'UPDATE_ORDER_SUCCESS':
            return {
                ...state,
                ...action.orderDetails,
            };
        case 'DELETE_ORDER_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_ORDER_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        default:
            return state;
    }
}
