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
    postalCode: {
        field: 'postalCode',
        data: '',
    },
    city: {
        field: 'city',
        data: '',
    },
    buildingTypeId: {
        field: 'buildingTypeId',
        data: '',
    },
    energyLabelId: {
        field: 'energyLabelId',
        data: '',
    },
    isHouseForSale: {
        field: 'isHouseForSale',
        data: '',
    },
    buildYear: {
        field: 'buildYear',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_HOUSING_FILE_DATE':
            return {
                ...state,
                createdAt: {
                    ...state.createdAt,
                    data: action.createdAt,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_FULL_NAME':
            return {
                ...state,
                fullName: {
                    ...state.fullName,
                    data: action.fullName,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_ADDRESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    data: action.address,
                },
            };
        case 'SET_FILTER_POSTAL_CODE':
            return {
                ...state,
                postalCode: {
                    ...state.postalCode,
                    data: action.postalCode,
                },
            };
        case 'SET_FILTER_CITY':
            return {
                ...state,
                city: {
                    ...state.city,
                    data: action.city,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_BUILDING_TYPE':
            return {
                ...state,
                buildingTypeId: {
                    ...state.buildingTypeId,
                    data: action.buildingTypeId,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_ENERGY_LABEL':
            return {
                ...state,
                energyLabelId: {
                    ...state.energyLabelId,
                    data: action.energyLabelId,
                },
            };
        case 'SET_FILTER_IS_HOUSE_FOR_SALE':
            return {
                ...state,
                isHouseForSale: {
                    ...state.isHouseForSale,
                    data: action.isHouseForSale,
                },
            };
        case 'SET_FILTER_BUILD_YEAR':
            return {
                ...state,
                buildYear: {
                    ...state.buildYear,
                    data: action.buildYear,
                },
            };
        case 'CLEAR_FILTER_HOUSING_FILES':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
