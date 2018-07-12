export default (state = [{
    field: 'createdAt',
    order: 'desc',
}], action) => {
    switch (action.type) {
        case 'SET_CONTACTS_SORTS_FILTER':
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
