const filtersReducerDefaultState = {
    intake: {
        field: 'intake',
        data: '',
    },
    createdAtStart: {
        field: 'createdAtStart',
        data: '',
    },
    createdAtEnd: {
        field: 'createdAtEnd',
        data: '',
    },
    desiredDateStart: {
        field: 'desiredDateStart',
        data: '',
    },
    desiredDateEnd: {
        field: 'desiredDateEnd',
        data: '',
    },
    name: {
        field: 'name',
        data: '',
    },
    measureCategory: {
        field: 'measureCategory',
        data: '',
    },
    measureName: {
        field: 'measureName',
        data: '',
    },
    campaign: {
        field: 'campaign',
        data: '',
    },
    areaName: {
        field: 'areaName',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
    amountOfQuotationRequests: {
        field: 'amountOfQuotationRequests',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_OPPORTUNITY_INTAKE':
            return {
                ...state,
                intake: {
                    ...state.intake,
                    data: action.intake,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_CREATED_AT_START':
            return {
                ...state,
                createdAtStart: {
                    ...state.createdAtStart,
                    data: action.createdAtStart,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_CREATED_AT_END':
            return {
                ...state,
                createdAtEnd: {
                    ...state.createdAtEnd,
                    data: action.createdAtEnd,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_DESIRED_DATE_START':
            return {
                ...state,
                desiredDateStart: {
                    ...state.desiredDateStart,
                    data: action.desiredDateStart,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_DESIRED_DATE_END':
            return {
                ...state,
                desiredDateEnd: {
                    ...state.desiredDateEnd,
                    data: action.desiredDateEnd,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_NAME':
            return {
                ...state,
                name: {
                    ...state.name,
                    data: action.name,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_MEASURE_CATEGORY':
            return {
                ...state,
                measureCategory: {
                    ...state.measureCategory,
                    data: action.measureCategory,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_MEASURE_NAME':
            return {
                ...state,
                measureName: {
                    ...state.measureName,
                    data: action.measureName,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_CAMPAIGN':
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    data: action.campaign,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_AREA_NAME':
            return {
                ...state,
                areaName: {
                    ...state.areaName,
                    data: action.areaName,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_STATUS_ID':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                },
            };
        case 'SET_FILTER_OPPORTUNITY_AMOUNT_OF_QUOTATION_REQUESTS':
            return {
                ...state,
                amountOfQuotationRequests: {
                    ...state.amountOfQuotationRequests,
                    data: action.amountOfQuotationRequests,
                },
            };
        case 'CLEAR_FILTER_OPPORTUNITY':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
