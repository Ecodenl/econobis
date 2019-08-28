export default function(state = { distribution: { data: [] } }, action) {
    switch (action.type) {
        case 'FETCH_PROJECT_REVENUE_SUCCESS':
            return {
                ...state,
                ...action.projectRevenue,
            };
        case 'CLEAR_PROJECT_REVENUE':
            return (state.projectRevenue = []);
        case 'PROJECT_REVENUE_GET_DISTRIBUTION_SUCCESS':
            return {
                ...state,
                distribution: action.projectRevenueDistribution.data,
            };
        default:
            return state;
    }
}
