const filtersReducerDefaultState = {
    createdAtStart: {
        field: 'createdAtStart',
        data: '',
    },
    createdAtEnd: {
        field: 'createdAtEnd',
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
    areaName: {
        field: 'areaName',
        data: '',
    },
    campaign: {
        field: 'campaign',
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
        case 'SET_FILTER_INTAKE_DATE_START':
            return {
                ...state,
                createdAtStart: {
                    ...state.createdAtStart,
                    data: action.createdAtStart,
                },
            };
        case 'SET_FILTER_INTAKE_DATE_END':
            return {
                ...state,
                createdAtEnd: {
                    ...state.createdAtEnd,
                    data: action.createdAtEnd,
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
        case 'SET_FILTER_INTAKE_AREA_NAME':
            return {
                ...state,
                areaName: {
                    ...state.areaName,
                    data: action.areaName,
                },
            };
        case 'SET_FILTER_INTAKE_CAMPAIGN':
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    data: action.campaign,
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
