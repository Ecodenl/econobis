export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_OPPORTUNITIES_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_OPPORTUNITIES_SUCCESS':
            return {
                data: action.opportunities.data.data,
                meta: {
                    total: action.opportunities.data.meta.total,
                    opportunityIdsTotal: action.opportunities.data.meta.opportunityIdsTotal,
                },
                isLoading: false,
            };
        case 'DELETE_OPPORTUNITY_SUCCESS':
            return {
                ...state,
                data: state.data.filter(opportunity => opportunity.id !== action.id),
                meta: {
                    total: state.meta.total - 1,
                },
            };
        case 'CLEAR_OPPORTUNITIES':
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
