const filtersReducerDefaultState = {
    number: {
        field: 'number',
        data: '',
    },
    dateNextInvoice: {
        field: 'dateNextInvoice',
        data: '',
    },
    subject: {
        field: 'subject',
        data: '',
    },
    contact: {
        field: 'contact',
        data: '',
    },
    paymentTypeId: {
        field: 'paymentTypeId',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_NUMBER_FILTER_ORDERS':
            return {
                ...state,
                number: {
                    ...state.number,
                    data: action.number,
                },
            };
        case 'SET_DATE_NEXT_INVOICE_FILTER_ORDERS':
            return {
                ...state,
                dateNextInvoice: {
                    ...state.dateNextInvoice,
                    data: action.dateNextInvoice,
                },
            };
        case 'SET_SUBJECT_FILTER_ORDERS':
            return {
                ...state,
                subject: {
                    ...state.subject,
                    data: action.subject,
                },
            };
        case 'SET_CONTACT_FILTER_ORDERS':
            return {
                ...state,
                contact: {
                    ...state.contact,
                    data: action.contact,
                },
            };
        case 'SET_PAYMENT_TYPE_ID_FILTER_ORDERS':
            return {
                ...state,
                paymentTypeId: {
                    ...state.paymentTypeId,
                    data: action.paymentTypeId,
                },
            };
        case 'SET_STATUS_ID_FILTER_ORDERS':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                },
            };
        case 'CLEAR_FILTER_ORDERS':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
