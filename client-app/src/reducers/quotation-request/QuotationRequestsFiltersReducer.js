const filtersReducerDefaultState = {
    organisationOrCoach: {
        field: 'organisationOrCoach',
        data: '',
    },
    contact: {
        field: 'contact',
        data: '',
    },
    campaign: {
        field: 'campaign',
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
    measure: {
        field: 'measure',
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
    datePlanned: {
        field: 'datePlanned',
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
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_QUOTATION_REQUEST_ORGANISATION_OR_COACH':
            return {
                ...state,
                organisationOrCoach: {
                    ...state.organisationOrCoach,
                    data: action.organisationOrCoach,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_CONTACT':
            return {
                ...state,
                contact: {
                    ...state.contact,
                    data: action.contact,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_ADDRESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    data: action.address,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_AREA_NAME':
            return {
                ...state,
                areaName: {
                    ...state.areaName,
                    data: action.areaName,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_CAMPAIGN':
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    data: action.campaign,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_MEASURE':
            return {
                ...state,
                measure: {
                    ...state.measure,
                    data: action.measure,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_CREATED_AT_START':
            return {
                ...state,
                createdAtStart: {
                    ...state.createdAtStart,
                    data: action.createdAtStart,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_CREATED_AT_END':
            return {
                ...state,
                createdAtEnd: {
                    ...state.createdAtEnd,
                    data: action.createdAtEnd,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_DATE_PLANNED':
            return {
                ...state,
                datePlanned: {
                    ...state.datePlanned,
                    data: action.datePlanned,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_DATE_RECORDED':
            return {
                ...state,
                dateRecorded: {
                    ...state.dateRecorded,
                    data: action.dateRecorded,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_STATUS':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                },
            };
        case 'SET_FILTER_QUOTATION_REQUEST_DATE_RELEASED':
            return {
                ...state,
                dateReleased: {
                    ...state.dateReleased,
                    data: action.dateReleased,
                },
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
