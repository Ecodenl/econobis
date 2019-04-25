export default function(state = [], action) {
    switch (action.type) {
        case 'PRODUCTION_PROJECT_REVENUE_PREVIEW_REPORT':
            return {
                ...action.data,
            };
        case 'CLEAR_PRODUCTION_PROJECT_REVENUE_PREVIEW_REPORT':
            return (state.productionProjectRevenueReportPreview = []);

        default:
            return state;
    }
}
