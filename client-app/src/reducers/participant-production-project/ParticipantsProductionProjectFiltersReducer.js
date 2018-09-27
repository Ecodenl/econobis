const filtersReducerDefaultState = {
    id: {
        field: 'id',
        data: '',
    },
    contactType: {
        field: 'contactType',
        data: '',
    },
    name: {
        field: 'name',
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
    statusId: {
        field: 'statusId',
        data: '',
    },
    currentParticipations: {
        field: 'currentParticipations',
        data: '',
    },
    participationStatusId: {
        field: 'participationStatusId',
        data: '',
    },
    dateRegister: {
        field: 'dateRegister',
        data: '',
    },
    energySupplierId: {
        field: 'energySupplierId',
        data: '',
    },
    productionProjectId: {
        field: 'productionProjectId',
        data: '',
    }
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_FILTER_PRODUCTION_PROJECT_PARTICIPANT_ID':
            return {
                ...state,
                id: {
                    ...state.id,
                    data: action.id,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_ID':
            return {
                ...state,
                productionProjectId: {
                    ...state.productionProjectId,
                    data: action.productionProjectId,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_CONTACT_TYPE':
            return {
                ...state,
                contactType: {
                    ...state.contactType,
                    data: action.contactType,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_NAME':
            return {
                ...state,
                name: {
                    ...state.name,
                    data: action.name,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_ADDRESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    data: action.address,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_POSTAL_CODE':
            return {
                ...state,
                postalCode: {
                    ...state.postalCode,
                    data: action.postalCode,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_CITY':
            return {
                ...state,
                city: {
                    ...state.city,
                    data: action.city,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_STATUS_ID':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_CURRENT_PARTICIPATIONS':
            return {
                ...state,
                currentParticipations: {
                    ...state.currentParticipations,
                    data: action.currentParticipations,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_PARTICIPATION_STATUS_ID':
            return {
                ...state,
                participationStatusId: {
                    ...state.participationStatusId,
                    data: action.participationStatusId,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_DATE_REGISTER':
            return {
                ...state,
                dateRegister: {
                    ...state.dateRegister,
                    data: action.dateRegister,
                }
            };
        case 'SET_FILTER_PARTICIPANT_PRODUCTION_PROJECT_ENERGY_SUPPLIER_ID':
            return {
                ...state,
                energySupplierId: {
                    ...state.energySupplierId,
                    data: action.energySupplierId,
                }
            };
        case 'CLEAR_FILTER_PARTICIPANTS_PRODUCTION_PROJECT':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
