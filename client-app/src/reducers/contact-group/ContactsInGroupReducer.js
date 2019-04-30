export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_CONTACTS_IN_GROUP_SUCCESS':
            return [...state, ...action.contactsInGroup];
        case 'CLEAR_CONTACTS_IN_GROUP':
            return (state.contactsInGroup = []);
        case 'DELETE_CONTACT_IN_GROUP_SUCCESS':
            return state.filter(contactInGroup => contactInGroup.id !== action.id);
        default:
            return state;
    }
}
