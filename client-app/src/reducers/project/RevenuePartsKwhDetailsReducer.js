export default function(state = { distributionPartsKwh: { data: [] } }, action) {
    switch (action.type) {
        case 'FETCH_REVENUE_PARTS_KWH_SUCCESS':
            return {
                ...state,
                ...action.revenuePartsKwh,
            };
        case 'CLEAR_REVENUE_PARTS_KWH':
            return (state.revenuePartsKwh = []);
        case 'REVENUES_KWH_GET_DISTRIBUTION_PARTS_SUCCESS':
            return {
                ...state,
                distributionPartsKwh: action.revenueDistributionPartsKwh.data,
            };
        default:
            return state;
    }
}
