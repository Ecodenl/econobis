const filtersReducerDefaultState = {
    createdAt: {
        field: 'createdAt',
        data: '',
    },
    typeId: {
        field: 'typeId',
        data: '',
    },
    note: {
        field: 'note',
        data: '',
    },
    contactFullName: {
        field: 'contactFullName',
        data: '',
    },
    datePlannedStart: {
        field: 'datePlannedStart',
        data: '',
    },
    responsibleName: {
        field: 'responsibleName',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_FILTER_TASK_CREATED_AT':
            return {
                ...state,
                createdAt: {
                    ...state.createdAt,
                    data: action.createdAt,
                }
            };
        case 'SET_FILTER_TASK_TYPE_ID':
            return {
                ...state,
                typeId: {
                    ...state.typeId,
                    data: action.typeId,
                }
            };
        case 'SET_FILTER_TASK_NOTE':
            return {
                ...state,
                note: {
                    ...state.note,
                    data: action.note,
                }
            };
        case 'SET_FILTER_TASK_CONTACT_FULL_NAME':
            return {
                ...state,
                contactFullName: {
                    ...state.contactFullName,
                    data: action.contactFullName,
                }
            };
        case 'SET_FILTER_TASK_DATE_PLANNED_START':
            return {
                ...state,
                datePlannedStart: {
                    ...state.datePlannedStart,
                    data: action.datePlannedStart,
                }
            };
        case 'SET_FILTER_TASK_RESPONSIBLE_NAME':
            return {
                ...state,
                responsibleName: {
                    ...state.responsibleName,
                    data: action.responsibleName,
                }
            };
        case 'CLEAR_FILTER_TASKS':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
