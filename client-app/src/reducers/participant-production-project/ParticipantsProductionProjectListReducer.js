export default function (state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_SUCCESS':
            return {
                data: action.participantsProductionProject.data.data,
                meta: {
                    total: action.participantsProductionProject.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_PARTICIPANTS_PRODUCTION_PROJECT':
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
