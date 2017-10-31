export default function (state= [], action) {
    switch (action.type) {
    case 'FETCH_CONTACTS_SUCCESS':
        return [
            ...state,
            ...action.contacts
        ];
    case 'CLEAR_CONTACTS':
        return state.contacts = [];
    case 'DELETE_CONTACT_SUCCESS':
        return state.filter((contact) => contact.id !== action.id);
    case 'DELETE_SELECTED_CONTACTS':
        return state.filter((contact) => contact.checked !== true);
    case 'SET_CHECKED_CONTACT':
        return state.map((contact) => {
            if (contact.id === action.id) {
                return {
                    ...contact,
                    checked: !contact.checked
                };
            } else {
                return contact;
            };
        });
    case 'SET_CHECKED_CONTACT_ALL':
        return state.map((contact) => {
            return {
                ...contact,
                checked: action.checkedValue
            };
        });
    default:
        return state;
    }
}