export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_EMAIL_TEMPLATE_SUCCESS':
            return {
                ...action.emailTemplate,
            };
        case 'CLEAR_EMAIL_TEMPLATE':
            return (state.emailTemplate = []);
        default:
            return state;
    }
}
