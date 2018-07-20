const filtersReducerDefaultState = {
    name: {
        field: 'name',
        data: '',
    },
    status: {
        field: 'status',
        data: '',
    },
    typeId: {
        field: 'typeId',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_FILTER_CONTACT_GROUP_NAME':
            return {
                ...state,
                name: {
                    ...state.name,
                    data: action.name,
                }
            };
        case 'SET_FILTER_CONTACT_GROUP_STATUS':
            return {
                ...state,
                status: {
                    ...state.status,
                    data: action.status,
                }
            };
        case 'SET_FILTER_CONTACT_GROUP_TYPE_ID':
            return {
                ...state,
                typeId: {
                    ...state.typeId,
                    data: action.typeId,
                }
            };
        case 'CLEAR_FILTER_CONTACT_GROUPS':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
