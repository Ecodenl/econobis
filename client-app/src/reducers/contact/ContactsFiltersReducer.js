const filtersReducerDefaultState = {
    number: {
        field: 'number',
        data: '',
    },
    typeId: {
        field: 'typeId',
        data: '',
    },
    fullName: {
        field: 'fullName',
        data: '',
    },
    streetAndNumber: {
        field: 'streetAndNumber',
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
    emailAddress: {
        field: 'emailAddress',
        data: '',
    },
    phoneNumber: {
        field: 'phoneNumber',
        data: '',
    },
    iban: {
        field: 'iban',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
    createdAt: {
        field: 'createdAt',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_NUMBER_FILTER':
            return {
                ...state,
                number: {
                    ...state.number,
                    data: action.number,
                },
            };
        case 'SET_TYPE_FILTER':
            return {
                ...state,
                typeId: {
                    ...state.typeId,
                    data: action.typeId,
                },
            };
        case 'SET_FULL_NAME_FILTER':
            return {
                ...state,
                fullName: {
                    ...state.fullName,
                    data: action.fullName,
                },
            };
        case 'SET_STREET_AND_NUMBER_FILTER':
            return {
                ...state,
                streetAndNumber: {
                    ...state.streetAndNumber,
                    data: action.streetAndNumber,
                },
            };
        case 'SET_POSTAL_CODE_FILTER':
            return {
                ...state,
                postalCode: {
                    ...state.postalCode,
                    data: action.postalCode,
                },
            };
        case 'SET_CITY_FILTER':
            return {
                ...state,
                city: {
                    ...state.city,
                    data: action.city,
                },
            };
        case 'SET_EMAIL_ADDRESS_FILTER':
            return {
                ...state,
                emailAddress: {
                    ...state.emailAddress,
                    data: action.emailAddress,
                },
            };
        case 'SET_PHONE_NUMBER_FILTER':
            return {
                ...state,
                phoneNumber: {
                    ...state.phoneNumber,
                    data: action.phoneNumber,
                },
            };
        case 'SET_IBAN_FILTER':
            return {
                ...state,
                iban: {
                    ...state.iban,
                    data: action.iban,
                },
            };
        case 'SET_STATUS_FILTER':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                },
            };
        case 'SET_CREATED_AT_FILTER':
            return {
                ...state,
                createdAt: {
                    ...state.createdAt,
                    data: action.createdAt,
                },
            };
        case 'CLEAR_FILTER_CONTACTS':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
