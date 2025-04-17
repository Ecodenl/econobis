export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_INVOICE_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.invoiceDetails,
                deleteSuccess: false,
            };
        case 'FETCH_INVOICE_FROM_TWINFIELD_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.invoiceDetails,
                deleteSuccess: false,
            };
        case 'UPDATE_INVOICE_SUCCESS':
            return {
                ...state,
                ...action.invoiceDetails,
            };
        case 'DELETE_INVOICE_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_INVOICE_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        default:
            return state;
    }
}
