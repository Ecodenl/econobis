export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_QUOTATION_REQUEST_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.quotationRequestDetails,
            };
        case 'UPDATE_QUOTATION_REQUEST':
            return {
                ...state,
                ...action.quotationRequestDetails,
            };
        default:
            return state;
    }
}
