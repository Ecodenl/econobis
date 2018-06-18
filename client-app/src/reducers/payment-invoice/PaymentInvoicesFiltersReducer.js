const filtersReducerDefaultState = {
    number: {
        field: 'number',
        data: '',
    },
    contact: {
        field: 'contact',
        data: '',
    },
    payout: {
        field: 'payout',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_NUMBER_FILTER_PAYMENT_INVOICES':
            return {
                ...state,
                number: {
                    ...state.number,
                    data: action.number,
                }
            };
        case 'SET_CONTACT_FILTER_PAYMENT_INVOICES':
            return {
                ...state,
                contact: {
                    ...state.contact,
                    data: action.contact,
                }
            };
        case 'SET_PAYOUT_FILTER_PAYMENT_INVOICES':
            return {
                ...state,
                payout: {
                    ...state.payout,
                    data: action.payout,
                }
            };
        case 'SET_STATUS_ID_FILTER_PAYMENT_INVOICES':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                }
            };
        case 'CLEAR_FILTER_PAYMENT_INVOICES':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
