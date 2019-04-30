const filtersReducerDefaultState = {
    number: {
        field: 'number',
        data: '',
    },
    dateRequested: {
        field: 'dateRequested',
        data: '',
    },
    subject: {
        field: 'subject',
        data: '',
    },
    daysToExpire: {
        field: 'daysToExpire',
        data: '',
    },
    daysLastReminder: {
        field: 'daysLastReminder',
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
        case 'SET_NUMBER_FILTER_INVOICES':
            return {
                ...state,
                number: {
                    ...state.number,
                    data: action.number,
                },
            };
        case 'SET_DATE_REQUESTED_FILTER_INVOICES':
            return {
                ...state,
                dateRequested: {
                    ...state.dateRequested,
                    data: action.dateRequested,
                },
            };
        case 'SET_DAYS_TO_EXPIRE_FILTER_INVOICES':
            return {
                ...state,
                daysToExpire: {
                    ...state.daysToExpire,
                    data: action.daysToExpire,
                },
            };
        case 'SET_DAYS_LAST_REMINDER_FILTER_INVOICES':
            return {
                ...state,
                daysLastReminder: {
                    ...state.daysLastReminder,
                    data: action.daysLastReminder,
                },
            };
        case 'SET_CONTACT_FILTER_INVOICES':
            return {
                ...state,
                contact: {
                    ...state.contact,
                    data: action.contact,
                },
            };
        case 'SET_SUBJECT_FILTER_INVOICES':
            return {
                ...state,
                subject: {
                    ...state.subject,
                    data: action.subject,
                },
            };
        case 'SET_PAYMENT_TYPE_ID_FILTER_INVOICES':
            return {
                ...state,
                paymentTypeId: {
                    ...state.paymentTypeId,
                    data: action.paymentTypeId,
                },
            };
        case 'SET_STATUS_ID_FILTER_INVOICES':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                },
            };
        case 'CLEAR_FILTER_INVOICES':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
