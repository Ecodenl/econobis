const filtersReducerDefaultState = {
    fullName: {
        field: 'fullName',
        data: '',
    },
    address: {
        field: 'address',
        data: '',
    },
    postalCode: {
        field: 'postalCode',
        data: '',
    },
    city: {
        field: 'city',
        data: '',
    },
    measureCategoryName: {
        field: 'measureCategoryName',
        data: '',
    },
    measureName: {
        field: 'measureName',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
    measureDateStart: {
        field: 'measureDateStart',
        data: '',
    },
    measureDateEnd: {
        field: 'measureDateEnd',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_FULL_NAME':
            return {
                ...state,
                fullName: {
                    ...state.fullName,
                    data: action.fullName,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_ADDRESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    data: action.address,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_POSTAL_CODE':
            return {
                ...state,
                postalCode: {
                    ...state.postalCode,
                    data: action.postalCode,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CITY':
            return {
                ...state,
                city: {
                    ...state.city,
                    data: action.city,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_CATEGORY_NAME':
            return {
                ...state,
                measureCategoryName: {
                    ...state.measureCategoryName,
                    data: action.measureCategoryName,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_NAME':
            return {
                ...state,
                measureName: {
                    ...state.measureName,
                    data: action.measureName,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_DATE_START':
            return {
                ...state,
                measureDateStart: {
                    ...state.measureDateStart,
                    data: action.measureDateStart,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_DATE_END':
            return {
                ...state,
                measureDateEnd: {
                    ...state.measureDateEnd,
                    data: action.measureDateEnd,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_STATUS':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                },
            };
        case 'CLEAR_FILTER_HOUSING_FILE_SPECIFICATIONS':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
