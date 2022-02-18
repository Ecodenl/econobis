export default function(state = { distributionPartsKwh: { data: [] } }, action) {
    switch (action.type) {
        case 'FETCH_REVENUES_KWH_PARTS_SUCCESS':
            return {
                ...state,
                ...action.revenuePartsKwh,
            };
        case 'CLEAR_REVENUES_KWH_PARTS':
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
