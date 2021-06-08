export default (
    state = [
        {
            field: 'code',
            order: 'asc',
        },
    ],
    action
) => {
    switch (action.type) {
        case 'SET_PROJECTS_SORTS_FILTER':
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
