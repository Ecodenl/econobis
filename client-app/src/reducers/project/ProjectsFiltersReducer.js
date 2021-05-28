const filtersReducerDefaultState = {
    code: {
        field: 'code',
        data: '',
    },
    name: {
        field: 'name',
        data: '',
    },
    projectTypeId: {
        field: 'projectTypeId',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PROJECT_CODE_FILTER':
            return {
                ...state,
                code: {
                    ...state.code,
                    data: action.code,
                },
            };
        case 'SET_PROJECT_FILTER':
            return {
                ...state,
                name: {
                    ...state.name,
                    data: action.name,
                },
            };
        case 'SET_TYPE_PROJECT_FILTER':
            return {
                ...state,
                projectTypeId: {
                    ...state.projectTypeId,
                    data: action.projectTypeId,
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
