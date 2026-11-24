export default (state = [], action) => {
    switch (action.type) {
        case 'SET_QUOTATION_REQUESTS_SORTS_FILTER':
            return [
                {
                    field: action.field,
                    order: action.order,
                },
                ...state.filter(sort => sort.field !== action.field),
            ].slice(0, 3);

        default:
            return state;
    }
};
