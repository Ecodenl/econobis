export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_OPPORTUNITY_SUCCESS':
            return {
                ...action.opportunity,
            };
        case 'CLEAR_OPPORTUNITY':
            return (state.opportunity = []);
        default:
            return state;
    }
}
