export default (state = [], action) => {
    switch (action.type) {
        case 'SET_HOUSING_FILE_SPECIFICATIONS_SORTS_FILTER':
            if (state.length === 3) state.pop();

            return [
                {
                    field: action.field,
                    order: action.order,
                },
                ...state,
            ];
        default:
            return state;
    }
};
