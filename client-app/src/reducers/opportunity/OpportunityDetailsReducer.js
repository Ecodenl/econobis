export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_OPPORTUNITY_SUCCESS':
            return {
                ...action.opportunity,
                deleteSuccess: false,
            };
        case 'DELETE_OPPORTUNITY_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_OPPORTUNITY_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        case 'CLEAR_OPPORTUNITY':
            return (state.opportunity = []);
        default:
            return state;
    }
}
