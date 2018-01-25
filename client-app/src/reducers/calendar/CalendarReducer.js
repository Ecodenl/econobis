export default function (state = { date: '', view: 'week' }, action) {
    switch (action.type) {
        case 'SET_SELECTED_DATE':
            return {
                ...state,
                date: action.date,
            };
        case 'SET_SELECTED_VIEW':
            return {
                ...state,
                view: action.view,
            };
        default:
            return state;
    }
}