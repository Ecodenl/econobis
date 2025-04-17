export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_EMAIL_TEMPLATE_SUCCESS':
            return {
                ...action.emailTemplate,
                deleteSuccess: false,
            };
        case 'DELETE_EMAIL_TEMPLATE_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_EMAIL_TEMPLATE_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        case 'CLEAR_EMAIL_TEMPLATE':
            return (state.emailTemplate = []);
        default:
            return state;
    }
}
