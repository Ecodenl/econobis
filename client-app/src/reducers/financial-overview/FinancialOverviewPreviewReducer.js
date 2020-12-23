export default function(state = { selectedIds: [] }, action) {
    switch (action.type) {
        case 'FINANCIAL_OVERVIEW_PREVIEW_REPORT':
            return { selectedIds: action.data };
        case 'CLEAR_FINANCIAL_OVERVIEW_PREVIEW_REPORT':
            return (state.selectedIds = []);
        default:
            return state;
    }
}
