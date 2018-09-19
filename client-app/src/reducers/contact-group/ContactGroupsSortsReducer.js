export default (state = [{field: 'name', order: 'asc'}], action) => {
    switch(action.type) {
        case 'SET_CONTACT_GROUP_SORTS':
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
