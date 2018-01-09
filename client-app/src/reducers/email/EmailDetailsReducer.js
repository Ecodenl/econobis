export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_EMAIL_SUCCESS':
            return {
                ...action.email,
            };
        case 'CLEAR_EMAIL':
            return state.email = [];
        default:
            return state;

    }
}