export default function(state = { distributionKwh: { data: [] } }, action) {
    switch (action.type) {
        case 'FETCH_REVENUES_KWH_SUCCESS':
            return {
                ...state,
                ...action.revenuesKwh,
            };
        case 'CLEAR_REVENUES_KWH':
            return (state.revenuesKwh = []);
        case 'REVENUES_KWH_GET_DISTRIBUTION_SUCCESS':
            return {
                ...state,
                distributionKwh: action.revenueDistributionKwh.data,
            };
        default:
            return state;
    }
}
