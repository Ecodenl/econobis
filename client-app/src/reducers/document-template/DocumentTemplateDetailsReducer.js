export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_DOCUMENT_TEMPLATE_SUCCESS':
            return {
                ...action.documentTemplate,
                deleteSuccess: false,
            };
        case 'CLEAR_DOCUMENT_TEMPLATE':
            return (state.documentTemplate = []);
        case 'DELETE_DOCUMENT_TEMPLATE_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_DOCUMENT_TEMPLATE_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        default:
            return state;
    }
}
