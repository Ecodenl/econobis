export default function(state = [], action) {
    switch (action.type) {
        case 'PROJECT_REVENUE_PREVIEW_REPORT':
            return {
                ...action.data,
            };
        case 'CLEAR_PROJECT_REVENUE_PREVIEW_REPORT':
            return (state.projectRevenueReportPreview = []);

        default:
            return state;
    }
}
