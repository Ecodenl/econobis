export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_CONTACTS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_CONTACTS_SUCCESS':
            return {
                data: action.contacts.data.data,
                meta: {
                    total: action.contacts.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_CONTACTS':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        case 'DELETE_CONTACT_SUCCESS':
            return {
                ...state,
                data: state.data.filter(contact => contact.id !== action.id),
                meta: {
                    total: state.meta.total - 1,
                },
            };
        case 'DELETE_SELECTED_CONTACTS':
            return {
                ...state,
                data: state.data.filter(contact => contact.checked !== true),
            };
        case 'SET_CHECKED_CONTACT':
            return {
                ...state,
                data: state.data.map(contact => {
                    if (contact.id === action.id) {
                        return {
                            ...contact,
                            checked: !contact.checked,
                        };
                    } else {
                        return contact;
                    }
                }),
            };
        case 'SET_CHECKED_CONTACT_ALL':
            return {
                ...state,
                data: state.data.map(contact => {
                    return {
                        ...contact,
                        checked: action.checkedValue,
                    };
                }),
            };
        default:
            return state;
    }
}
