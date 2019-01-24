export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_PRODUCT_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.productDetails,
            };
        case 'UPDATE_PRODUCT_SUCCESS':
            return {
                ...state,
                ...action.productDetails,
            };
        case 'ADD_PRODUCT_PRICE_HISTORY_SUCCESS':
            return {
                ...state,
                priceHistory: [
                    ...state.priceHistory,
                    {
                        ...action.priceHistoryPayload,
                    },
                ],
            };
        default:
            return state;
    }
}
