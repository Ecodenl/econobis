export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_INVOICES_SUCCESS':
            return [
                ...state,
                ...action.invoices.data.data
            ];
        case 'CLEAR_INVOICES':
            return state.invoices = [];
        default:
            return state;
    }
}