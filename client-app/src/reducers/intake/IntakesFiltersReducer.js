const filtersReducerDefaultState = {
    createdAt: {
        field: 'createdAt',
        data: '',
    },
    fullName: {
        field: 'fullName',
        data: '',
    },
    address: {
        field: 'address',
        data: '',
    },
    measureRequested: {
        field: 'measureRequestedId',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_INTAKE_DATE':
            return {
                ...state,
                createdAt: {
                    ...state.createdAt,
                    data: action.createdAt,
                },
            };
        case 'SET_FILTER_INTAKE_FULL_NAME':
            return {
                ...state,
                fullName: {
                    ...state.fullName,
                    data: action.fullName,
                },
            };
        case 'SET_FILTER_INTAKE_ADDRESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    data: action.address,
                },
            };
        case 'SET_FILTER_INTAKE_MEASURE_REQUESTED':
            return {
                ...state,
                measureRequested: {
                    ...state.measureRequested,
                    data: action.measureRequested,
                },
            };
        case 'SET_FILTER_INTAKE_STATUS':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                },
            };
        case 'CLEAR_FILTER_INTAKES':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
