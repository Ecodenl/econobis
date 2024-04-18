export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_INTAKES_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_INTAKES_SUCCESS':
            return {
                data: action.intakes.data.data,
                meta: {
                    total: action.intakes.data.meta.total,
                    intakeIdsTotal: action.intakes.data.meta.intakeIdsTotal,
                },
                isLoading: false,
            };
        case 'CLEAR_INTAKES':
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
