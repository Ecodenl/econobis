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
    buildingTypeId: {
        field: 'buildingTypeId',
        data: '',
    },
    energyLabelId: {
        field: 'energyLabelId',
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
        case 'CLEAR_FILTER_HOUSING_FILES':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
