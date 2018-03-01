export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_PRODUCTION_PROJECT_REVENUE_SUCCESS':
            return {
                ...action.productionProjectRevenue,
            };
        case 'CLEAR_PRODUCTION_PROJECT_REVENUE':
            return state.productionProjectRevenue = [];

        default:
            return state;
    }
}