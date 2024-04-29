export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_QUOTATION_REQUESTS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_QUOTATION_REQUESTS_SUCCESS':
            return {
                data: action.quotationRequests.data.data,
                meta: {
                    total: action.quotationRequests.data.meta.total,
                    quotationRequestIdsTotal: action.quotationRequests.data.meta.quotationRequestIdsTotal,
                },
                isLoading: false,
            };
        case 'CLEAR_QUOTATION_REQUESTS':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        default:
            return state;
    }
}
