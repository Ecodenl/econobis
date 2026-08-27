export default function(state = [], action) {
    switch (action.type) {
        case 'DELETE_CONTACT_IN_GROUP_SUCCESS':
            return state.filter(contactInGroup => contactInGroup.id !== action.id);
        case 'UPDATE_CONTACT_IN_GROUP_SUCCESS':
            return state;
        default:
            return state;
    }
}
