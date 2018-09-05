export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_WEBFORMS_SUCCESS':
            return [
                ...state,
                ...action.webforms.data.data
            ];
        case 'CLEAR_WEBFORMS':
            return state.webforms = [];
        case 'DELETE_WEBFORM_SUCCESS':
            return state.filter(webform => webform.id !== action.id);
        default:
            return state;
    }
}