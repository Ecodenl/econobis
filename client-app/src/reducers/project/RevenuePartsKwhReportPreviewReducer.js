export default function(state = [], action) {
    switch (action.type) {
        case 'REVENUE_PARTS_KWH_PREVIEW_REPORT':
            return {
                ...action.data,
            };
        case 'CLEAR_REVENUE_PARTS_KWH_PREVIEW_REPORT':
            return (state.revenuePartsKwhReportPreview = []);

        default:
            return state;
    }
}
