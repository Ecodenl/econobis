export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_CAMPAIGNS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_CAMPAIGNS_SUCCESS':
            return {
                data: action.campaigns.data.data,
                meta: {
                    total: action.campaigns.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_CAMPAIGNS':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        default:
            return state;
    }
}
