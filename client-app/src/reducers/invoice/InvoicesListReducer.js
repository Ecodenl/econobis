export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_INVOICES_SUCCESS':
            return {
                data: action.invoices.data.data,
                meta: {
                    total: action.invoices.data.meta.total,
                    invoiceIdsTotal: action.invoices.data.meta.invoiceIdsTotal,
                    totalPrice: action.invoices.data.meta.totalPrice,
                },
            };
        case 'SET_CHECKED_INVOICE':
            return {
                ...state,
                data: state.data.map(invoice => {
                    if (invoice.id === action.id) {
                        return {
                            ...invoice,
                            checked: !invoice.checked,
                        };
                    } else {
                        return invoice;
                    }
                }),
            };
        case 'SET_CHECKED_INVOICE_ALL':
            return {
                ...state,
                data: state.data.map(invoice => {
                    return {
                        ...invoice,
                        checked: action.checkedValue,
                    };
                }),
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
