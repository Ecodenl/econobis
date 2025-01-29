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
    typeReadOutId: {
        field: 'typeReadOutId',
        data: '',
    },
    dateStartStart: {
        field: 'dateStartStart',
        data: '',
    },
    dateStartEnd: {
        field: 'dateStartEnd',
        data: '',
    },
    dateEndStart: {
        field: 'dateEndStart',
        data: '',
    },
    dateEndEnd: {
        field: 'dateEndEnd',
        data: '',
    },
    typeDongleId: {
        field: 'typeDongleId',
        data: '',
    },
    energyId: {
        field: 'energyId',
        data: '',
    },
    // macNumber: {
    //     field: 'macNumber',
    //     data: '',
    // },
    // dateSignedStart: {
    //     field: 'dateSignedStart',
    //     data: '',
    // },
    // dateSignedEnd: {
    //     field: 'dateSignedEnd',
    //     data: '',
    // },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_ADDRESS_DONGLE_FULL_NAME':
            return {
                ...state,
                fullName: {
                    ...state.fullName,
                    data: action.fullName,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_ADDRESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    data: action.address,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_POSTAL_CODE':
            return {
                ...state,
                postalCode: {
                    ...state.postalCode,
                    data: action.postalCode,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_CITY':
            return {
                ...state,
                city: {
                    ...state.city,
                    data: action.city,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_TYPE_READ_OUT_ID':
            return {
                ...state,
                typeReadOutId: {
                    ...state.typeReadOutId,
                    data: action.typeReadOutId,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_DATE_START_START':
            return {
                ...state,
                dateStartStart: {
                    ...state.dateStartStart,
                    data: action.dateStartStart,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_DATE_START_END':
            return {
                ...state,
                dateStartEnd: {
                    ...state.dateStartEnd,
                    data: action.dateStartEnd,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_DATE_END_START':
            return {
                ...state,
                dateEndStart: {
                    ...state.dateEndStart,
                    data: action.dateEndStart,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_DATE_END_END':
            return {
                ...state,
                dateEndEnd: {
                    ...state.dateEndEnd,
                    data: action.dateEndEnd,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_TYPE_DONGLE_ID':
            return {
                ...state,
                typeDongleId: {
                    ...state.typeDongleId,
                    data: action.typeDongleId,
                },
            };
        case 'SET_FILTER_ADDRESS_DONGLE_ENERGY_ID':
            return {
                ...state,
                energyId: {
                    ...state.energyId,
                    data: action.energyId,
                },
            };
        // case 'SET_FILTER_ADDRESS_DONGLE_MAC_NUMBER':
        //     return {
        //         ...state,
        //         macNumber: {
        //             ...state.macNumber,
        //             data: action.macNumber,
        //         },
        //     };
        // case 'SET_FILTER_ADDRESS_DONGLE_DATE_SIGNED_START':
        //     return {
        //         ...state,
        //         dateSignedStart: {
        //             ...state.dateSignedStart,
        //             data: action.dateSignedStart,
        //         },
        //     };
        // case 'SET_FILTER_ADDRESS_DONGLE_DATE_SIGNED_END':
        //     return {
        //         ...state,
        //         dateSignedEnd: {
        //             ...state.dateSignedEnd,
        //             data: action.dateSignedEnd,
        //         },
        //     };
        case 'CLEAR_FILTER_ADDRESS_DONGLES':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
