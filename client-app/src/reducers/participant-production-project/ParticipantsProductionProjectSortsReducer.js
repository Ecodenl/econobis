export default (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTICIPANTS_PRODUCTION_PROJECT_SORTS_FILTER':
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
