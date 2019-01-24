export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_POSTAL_CODE_LINKS_SUCCESS':
            return [...state, ...action.postalCodeLinks.data.data];
        case 'CLEAR_POSTAL_CODE_LINKS':
            return (state.postalCodeLinks = []);
        case 'DELETE_POSTAL_CODE_LINK_SUCCESS':
            return state.filter(postalCodeLink => postalCodeLink.id !== action.id);
        default:
            return state;
    }
}
