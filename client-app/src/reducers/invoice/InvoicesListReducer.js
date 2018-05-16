export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_INVOICES_SUCCESS':
            return {
                data: action.invoices.data.data,
                meta: {
                    total: action.invoices.data.meta.total,
                    totalPrice: action.invoices.data.meta.totalPrice,
                },
            };
        case 'CLEAR_INVOICES':
            return {
                ...state,
                data: [],
                meta: {},
            };
        default:
            return state;
    }
}