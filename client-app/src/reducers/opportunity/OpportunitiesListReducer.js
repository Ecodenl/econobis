export default function (state= { isLoading: false }, action) {
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
                },
                isLoading: false,
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