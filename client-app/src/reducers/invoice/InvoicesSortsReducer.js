export default (state = [], action) => {
    switch(action.type) {
        case 'SET_INVOICES_SORTS_FILTER':
            if(state.length === 3) state.shift();

        return [
            ...state,
            {
                field: action.field,
                invoice: action.invoice,
            },
        ];
    default:
        return state;
    }
};
