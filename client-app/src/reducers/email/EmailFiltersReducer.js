const filtersReducerDefaultState = {
    date: {
        field: 'date',
        data: '',
    },
    mailbox: {
        field: 'mailbox',
        data: '',
    },
    sentBy: {
        field: 'sentBy',
        data: '',
    },
    to: {
        field: 'to',
        data: '',
    },
    contact: {
        field: 'contact',
        data: '',
    },
    subject: {
        field: 'subject',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_FILTER_EMAIL_DATE':
            return {
                ...state,
                date: {
                    ...state.date,
                    data: action.date,
                }
            };
        case 'SET_FILTER_EMAIL_MAILBOX':
            return {
                ...state,
                mailbox: {
                    ...state.mailbox,
                    data: action.mailbox,
                }
            };
        case 'SET_FILTER_EMAIL_SENT_BY':
            return {
                ...state,
                sentBy: {
                    ...state.sentBy,
                    data: action.sentBy,
                }
            };
        case 'SET_FILTER_EMAIL_TO':
        return {
            ...state,
            to: {
                ...state.to,
                data: action.to,
            }
        };
        case 'SET_FILTER_EMAIL_CONTACT':
            return {
                ...state,
                contact: {
                    ...state.contact,
                    data: action.contact,
                }
            };
        case 'SET_FILTER_EMAIL_SUBJECT':
            return {
                ...state,
                subject: {
                    ...state.subject,
                    data: action.subject,
                }
            };
        case 'SET_FILTER_EMAIL_STATUS_ID':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                }
            };
        case 'CLEAR_FILTER_EMAIL':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
