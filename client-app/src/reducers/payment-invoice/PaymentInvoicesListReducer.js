export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_PAYMENT_INVOICES_SUCCESS':
            return {
                data: action.paymentInvoices.data.data,
                meta: {
                    total: action.paymentInvoices.data.meta.total,
                    totalPrice: action.paymentInvoices.data.meta.totalPrice,
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
