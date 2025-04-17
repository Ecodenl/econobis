export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_QUOTATION_REQUEST_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.quotationRequestDetails,
                deleteSuccess: false,
            };
        case 'UPDATE_QUOTATION_REQUEST':
            return {
                ...state,
                ...action.quotationRequestDetails,
            };
        case 'DELETE_QUOTATION_REQUEST_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_QUOTATION_REQUEST_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        default:
            return state;
    }
}
