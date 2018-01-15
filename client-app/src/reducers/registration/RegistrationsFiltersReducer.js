const filtersReducerDefaultState = {
    fullName: {
        field: 'fullName',
        data: '',
    },
    createdAt: {
        field: 'createdAt',
        data: '',
    },
    sourceId: {
        field: 'sourceId',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
    measureRequested: {
        field: 'measureRequestedId',
        data: '',
    }
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_FILTER_REGISTRATION_FULL_NAME':
            return {
                ...state,
                fullName: {
                    ...state.fullName,
                    data: action.fullName,
                }
            };
        case 'SET_FILTER_REGISTRATION_SOURCE':
            return {
                ...state,
                sourceId: {
                    ...state.sourceId,
                    data: action.sourceId,
                }
            };
        case 'SET_FILTER_REGISTRATION_DATE':
            return {
                ...state,
                createdAt: {
                    ...state.createdAt,
                    data: action.createdAt,
                }
            };
        case 'SET_FILTER_REGISTRATION_STATUS':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                }
            };
        case 'SET_FILTER_REGISTRATION_MEASURE_REQUESTED':
            return {
                ...state,
                measureRequested: {
                    ...state.measureRequested,
                    data: action.measureRequested,
                }
            };
        case 'CLEAR_FILTER_REGISTRATIONS':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
