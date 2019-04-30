export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_DOCUMENTS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_DOCUMENTS_SUCCESS':
            return {
                data: action.documents.data.data,
                meta: {
                    total: action.documents.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_DOCUMENTS':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        case 'DELETE_DOCUMENT_SUCCESS':
            return {
                ...state,
                data: state.data.filter(document => document.id !== action.id),
                meta: {
                    total: state.meta.total - 1,
                },
            };
        default:
            return state;
    }
}
