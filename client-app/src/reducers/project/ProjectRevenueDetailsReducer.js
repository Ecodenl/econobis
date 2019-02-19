export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_PROJECT_REVENUE_SUCCESS':
            return {
                ...action.projectRevenue,
            };
        case 'CLEAR_PROJECT_REVENUE':
            return (state.projectRevenue = []);
        case 'PROJECT_REVENUE_GET_PARTICIPANTS_SUCCESS':
            return {
                ...state,
                participants: action.projectRevenueParticipants.data,
            };
        case 'PROJECT_REVENUE_GET_DISTRIBUTION_SUCCESS':
            return {
                ...state,
                distribution: action.projectRevenueDistribution.data,
            };
        default:
            return state;
    }
}
