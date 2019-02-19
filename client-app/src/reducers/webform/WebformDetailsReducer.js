export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_WEBFORM_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.webformDetails.data.data,
            };
        case 'UPDATE_WEBFORM_SUCCESS':
            return {
                ...state,
                ...action.webformDetails,
            };
        default:
            return state;
    }
}
