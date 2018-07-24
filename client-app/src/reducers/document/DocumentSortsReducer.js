export default (state = [{
    field: 'id',
    order: 'desc',
}], action) => {
    switch(action.type) {
        case 'SET_DOCUMENT_SORTS':
            if(state.length === 3) state.pop();

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
