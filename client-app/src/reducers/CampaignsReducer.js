export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_CAMPAIGNS_SUCCESS':
            return [
                ...action.campaigns,
            ];
        case 'FETCH_CAMPAIGN_SUCCESS':
            return {
                ...action.campaign,
            };
        case 'CLEAR_CAMPAIGNS':
            return state.campaigns = [];
        case 'CLEAR_CAMPAIGN':
            return state.campaign = [];
        default:
            return state;
    }
}