export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_CAMPAIGN_SUCCESS':
            return {
                ...action.campaign,
            };
        case 'CLEAR_CAMPAIGN':
            return (state.campaign = []);
        default:
            return state;
    }
}
