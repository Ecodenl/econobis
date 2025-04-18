export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_INVOICE_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.invoiceDetails,
            };
        case 'FETCH_INVOICE_FROM_TWINFIELD_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.invoiceDetails,
            };
        case 'UPDATE_INVOICE_SUCCESS':
            return {
                ...state,
                ...action.invoiceDetails,
            };
        default:
            return state;
    }
}
