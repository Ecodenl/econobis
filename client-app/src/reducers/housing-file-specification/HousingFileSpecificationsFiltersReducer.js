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
    createdAtStart: {
        field: 'createdAtStart',
        data: '',
    },
    createdAtEnd: {
        field: 'createdAtEnd',
        data: '',
    },
    answer: {
        field: 'answer',
        data: '',
    },
    floorId: {
        field: 'floorId',
        data: '',
    },
    sideId: {
        field: 'sideId',
        data: '',
    },
    typeBrand: {
        field: 'typeBrand',
        data: '',
    },
    typeOfExecutionId: {
        field: 'typeOfExecutionId',
        data: '',
    },
    savingsGasFrom: {
        field: 'savingsGasFrom',
        data: '',
    },
    savingsGasTill: {
        field: 'savingsGasTill',
        data: '',
    },
    savingsElectricityFrom: {
        field: 'savingsElectricityFrom',
        data: '',
    },
    savingsElectricityTill: {
        field: 'savingsElectricityTill',
        data: '',
    },
    co2SavingsFrom: {
        field: 'co2SavingsFrom',
        data: '',
    },
    co2SavingsTill: {
        field: 'co2SavingsTill',
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
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CREATED_AT_START':
            return {
                ...state,
                createdAtStart: {
                    ...state.createdAtStart,
                    data: action.createdAtStart,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CREATED_AT_END':
            return {
                ...state,
                createdAtEnd: {
                    ...state.createdAtEnd,
                    data: action.createdAtEnd,
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
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_ANSWER':
            return {
                ...state,
                answer: {
                    ...state.answer,
                    data: action.answer,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_FLOOR':
            return {
                ...state,
                floorId: {
                    ...state.floorId,
                    data: action.floorId,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SIDE':
            return {
                ...state,
                sideId: {
                    ...state.sideId,
                    data: action.sideId,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_TYPE_BRAND':
            return {
                ...state,
                typeBrand: {
                    ...state.typeBrand,
                    data: action.typeBrand,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_TYPE_OF_EXECUTION':
            return {
                ...state,
                typeOfExecutionId: {
                    ...state.typeOfExecutionId,
                    data: action.typeOfExecutionId,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SAVINGS_GAS_FROM':
            return {
                ...state,
                savingsGasFrom: {
                    ...state.savingsGasFrom,
                    data: action.savingsGasFrom,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SAVINGS_GAS_TILL':
            return {
                ...state,
                savingsGasTill: {
                    ...state.savingsGasTill,
                    data: action.savingsGasTill,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SAVINGS_ELECTRICITY_FROM':
            return {
                ...state,
                savingsElectricityFrom: {
                    ...state.savingsElectricityFrom,
                    data: action.savingsElectricityFrom,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SAVINGS_ELECTRICITY_TILL':
            return {
                ...state,
                savingsElectricityTill: {
                    ...state.savingsElectricityTill,
                    data: action.savingsElectricityTill,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CO2_SAVINGS_FROM':
            return {
                ...state,
                co2SavingsFrom: {
                    ...state.co2SavingsFrom,
                    data: action.co2SavingsFrom,
                },
            };
        case 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CO2_SAVINGS_TILL':
            return {
                ...state,
                co2SavingsTill: {
                    ...state.co2SavingsTill,
                    data: action.co2SavingsTill,
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
