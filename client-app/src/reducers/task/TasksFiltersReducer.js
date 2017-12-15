const filtersReducerDefaultState = {
    createdAt: {
        field: 'createdAt',
        data: '',
    },
    name: {
        field: 'name',
        data: '',
    },
    contactFullName: {
        field: 'contactFullName',
        data: '',
    },
    datePlanned: {
        field: 'datePlanned',
        data: '',
    },
    dateStarted: {
        field: 'dateStarted',
        data: '',
    },
    statusId: {
        field: 'statusId',
        data: '',
    },
    responsibleUserName: {
        field: 'responsibleUserName',
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
        case 'SET_FILTER_TASK_NAME':
            return {
                ...state,
                name: {
                    ...state.name,
                    data: action.name,
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
        case 'SET_FILTER_TASK_DATE_PLANNED':
            return {
                ...state,
                datePlanned: {
                    ...state.datePlanned,
                    data: action.datePlanned,
                }
            };
        case 'SET_FILTER_TASK_DATE_STARTED':
            return {
                ...state,
                dateStarted: {
                    ...state.dateStarted,
                    data: action.dateStarted,
                }
            };
        case 'SET_FILTER_TASK_STATUS_ID':
            return {
                ...state,
                statusId: {
                    ...state.statusId,
                    data: action.statusId,
                }
            };
        case 'SET_FILTER_TASK_RESPONSIBLE_USER_NAME':
            return {
                ...state,
                responsibleUserName: {
                    ...state.responsibleUserName,
                    data: action.responsibleUserName,
                }
            };
        default:
            return state;
    }
};
