export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_DOCUMENT_TEMPLATE_SUCCESS':
            return {
                ...action.documentTemplate,
            };
        case 'CLEAR_DOCUMENT_TEMPLATE':
            return (state.documentTemplate = []);
        default:
            return state;
    }
}
