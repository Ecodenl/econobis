export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_EMAIL_TEMPLATES_SUCCESS':
            return [
                ...action.emailTemplates.data.data,
            ];
        case 'CLEAR_EMAIL_TEMPLATES':
            return state.emailTemplates = [];
        default:
            return state;

    }
}