export default function (state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_REGISTRATIONS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_REGISTRATIONS_SUCCESS':
            return {
                data: action.registrations.data.data,
                meta: {
                    total: action.registrations.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_REGISTRATIONS':
            return state.registrations.data.data = {};
        default:
            return state;
    }
}
