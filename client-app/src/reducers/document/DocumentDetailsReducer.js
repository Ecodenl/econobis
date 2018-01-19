export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_DOCUMENT_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.documentDetails.data.data,
            };
        case 'UPDATE_DOCUMENT_DETAILS':
            return {
                ...state,
                ...action.document,
            };
        default:
            return state;
    }
}