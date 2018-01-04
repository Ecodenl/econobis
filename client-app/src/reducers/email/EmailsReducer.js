export default function (state= [], action) {
    switch (action.type) {
    case 'FETCH_EMAILS_SUCCESS':
        return [
            ...action.emails.data.data,
        ];
    case 'CLEAR_EMAILS':
        return state.emails = [];
    default:
        return state;
    }
}