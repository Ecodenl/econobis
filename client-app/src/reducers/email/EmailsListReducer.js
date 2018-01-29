export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_EMAILS_SUCCESS':
            return {
                data: action.emails.data.data,
                meta: {
                    total: action.emails.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_EMAILS':
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