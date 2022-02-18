export default function(state = [], action) {
    switch (action.type) {
        case 'REVENUES_KWH_PREVIEW_REPORT':
            return {
                ...action.data,
            };
        case 'CLEAR_REVENUES_KWH_PREVIEW_REPORT':
            return (state.revenuesKwhReportPreview = []);

        default:
            return state;
    }
}
