const filtersReducerDefaultState = {
    organisation: {
        field: 'organisation',
        data: '',
    },
    contact: {
        field: 'contact',
        data: '',
    },
    address: {
        field: 'address',
        data: '',
    },
    measure: {
        field: 'measure',
        data: '',
    },
    createdAt: {
        field: 'createdAt',
        data: '',
    },
    dateRecorded: {
        field: 'dateRecorded',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
    dateReleased: {
        field: 'dateReleased',
        data: '',
    },
    dateValid: {
        field: 'dateValid',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_FILTER_QUOTATION_REQUEST_ORGANISATION':
            return {
                ...state,
                organisation: {
                    ...state.organisation,
                    data: action.organisation,
                }
            };
        case 'SET_FILTER_QUOTATION_REQUEST_CONTACT':
            return {
                ...state,
                contact: {
                    ...state.contact,
                    data: action.contact,
                }
            };
        case 'SET_FILTER_QUOTATION_REQUEST_ADDRESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    data: action.address,
                }
            };
        case 'SET_FILTER_QUOTATION_REQUEST_MEASURE':
            return {
                ...state,
                measure: {
                    ...state.measure,
                    data: action.measure,
                }
            };
        case 'SET_FILTER_QUOTATION_REQUEST_CREATED_AT':
            return {
                ...state,
                createdAt: {
                    ...state.createdAt,
                    data: action.createdAt,
                }
            };
        case 'SET_FILTER_QUOTATION_REQUEST_DATE_RECORDED':
            return {
                ...state,
                dateRecorded: {
                    ...state.dateRecorded,
                    data: action.dateRecorded,
                }
            };
        case 'SET_FILTER_QUOTATION_REQUEST_STATUS':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                }
            };
        case 'SET_FILTER_QUOTATION_REQUEST_DATE_RELEASED':
            return {
                ...state,
                dateReleased: {
                    ...state.dateReleased,
                    data: action.dateReleased,
                }
            };
        case 'SET_FILTER_QUOTATION_REQUEST_DATE_VALID':
            return {
                ...state,
                dateValid: {
                    ...state.dateValid,
                    data: action.dateValid,
                }
            };
        case 'CLEAR_FILTER_QUOTATION_REQUESTS':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
