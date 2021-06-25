export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_CONTACT_GROUP_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.contactGroupDetails,
            };
        case 'UPDATE_CONTACT_GROUP_DETAILS':
            return {
                ...state,
                ...action.contactGroupDetails,
            };
        case 'CLEAR_CONTACT_GROUP_DETAILS':
            return {};
        case 'UPDATE_LAPOSTA_LIST_ID':
            return { ...state, lapostaListId: action.lapostaListId };
        default:
            return state;
    }
}
