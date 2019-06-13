const filtersReducerDefaultState = {
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
    participantMutationStatusId: {
        field: 'participantMutationStatusId',
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
    projectId: {
        field: 'projectId',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_PARTICIPANT_PROJECT_ID':
            return {
                ...state,
                projectId: {
                    ...state.projectId,
                    data: action.projectId,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_CONTACT_TYPE':
            return {
                ...state,
                contactType: {
                    ...state.contactType,
                    data: action.contactType,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_NAME':
            return {
                ...state,
                name: {
                    ...state.name,
                    data: action.name,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_ADDRESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    data: action.address,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_POSTAL_CODE':
            return {
                ...state,
                postalCode: {
                    ...state.postalCode,
                    data: action.postalCode,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_CITY':
            return {
                ...state,
                city: {
                    ...state.city,
                    data: action.city,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_STATUS_ID':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_CURRENT_PARTICIPATIONS':
            return {
                ...state,
                currentParticipations: {
                    ...state.currentParticipations,
                    data: action.currentParticipations,
                },
            };
        case 'SET_FILTER_PARTICIPANT_MUTATION_STATUS_ID':
            return {
                ...state,
                participantMutationStatusId: {
                    ...state.participantMutationStatusId,
                    data: action.participantMutationStatusId,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_DATE_REGISTER':
            return {
                ...state,
                dateRegister: {
                    ...state.dateRegister,
                    data: action.dateRegister,
                },
            };
        case 'SET_FILTER_PARTICIPANT_PROJECT_ENERGY_SUPPLIER_ID':
            return {
                ...state,
                energySupplierId: {
                    ...state.energySupplierId,
                    data: action.energySupplierId,
                },
            };
        case 'CLEAR_FILTER_PARTICIPANTS_PROJECT':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
