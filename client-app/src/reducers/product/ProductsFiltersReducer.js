const filtersReducerDefaultState = {
    code: {
        field: 'code',
        data: '',
    },
    name: {
        field: 'name',
        data: '',
    },
    active: {
        field: 'active',
        data: '1',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_CODE_FILTER':
            return {
                ...state,
                code: {
                    ...state.code,
                    data: action.code,
                },
            };
        case 'SET_PRODUCT_FILTER':
            return {
                ...state,
                name: {
                    ...state.name,
                    data: action.name,
                },
            };
        case 'SET_ACTIVE_PRODUCT_FILTER':
            return {
                ...state,
                active: {
                    ...state.active,
                    data: action.active,
                },
            };
        case 'CLEAR_FILTER_PRODUCTS':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
