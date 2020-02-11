export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_PARTICIPANTS_PROJECT_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_PARTICIPANTS_PROJECT_SUCCESS':
            return {
                data: action.participantsProject.data.data,
                meta: {
                    total: action.participantsProject.data.meta.total,
                    participantIdsTotal: action.participantsProject.data.meta.participantIdsTotal,
                },
                isLoading: false,
            };
        case 'CLEAR_PARTICIPANTS_PROJECT':
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
