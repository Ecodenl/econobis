export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_PRODUCTION_PROJECT_REVENUE_SUCCESS':
            return {
                ...action.productionProjectRevenue,
            };
        case 'CLEAR_PRODUCTION_PROJECT_REVENUE':
            return (state.productionProjectRevenue = []);
        case 'PRODUCTION_PROJECT_REVENUE_GET_PARTICIPANTS_SUCCESS':
            return {
                ...state,
                participants: action.productionProjectRevenueParticipants.data,
            };
        case 'PRODUCTION_PROJECT_REVENUE_GET_DISTRIBUTION_SUCCESS':
            return {
                ...state,
                distribution: action.productionProjectRevenueDistribution.data,
            };
        default:
            return state;
    }
}
