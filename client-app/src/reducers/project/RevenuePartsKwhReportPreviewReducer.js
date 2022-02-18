export default function(state = [], action) {
    switch (action.type) {
        case 'REVENUES_KWH_PREVIEW_REPORT_PARTS':
            return {
                ...action.data,
            };
        case 'CLEAR_REVENUES_KWH_PREVIEW_REPORT_PARTS':
            return (state.revenuePartsKwhReportPreview = []);

        default:
            return state;
    }
}
