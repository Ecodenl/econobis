export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_DOCUMENT_TEMPLATES_SUCCESS':
            return [
                ...action.documentTemplates.data.data,
            ];
        case 'CLEAR_DOCUMENT_TEMPLATES':
            return state.documentTemplates = [];
        default:
            return state;

    }
}