export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_OPPORTUNITIES_SUCCESS':
            return [
                ...action.opportunities,
            ];
        case 'FETCH_OPPORTUNITY_SUCCESS':
            return {
                ...action.opportunity,
            };
        case 'CLEAR_OPPORTUNITIES':
            return state.opportunities = [];
        case 'CLEAR_OPPORTUNITY':
            return state.opportunity = [];
        default:
            return state;
    }
}