export default (state = [], action) => {
    switch(action.type) {
        case 'SET_PARTICIPANTS_PRODUCTION_PROJECT_SORTS_FILTER':
            if(state.length === 3) state.shift();

            return [
                ...state,
                {
                    field: action.field,
                    order: action.order,
                },
            ];
        default:
            return state;
    }
};
