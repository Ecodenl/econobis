export const fetchContacts = (filters, sorts) => {
    return {
        type: 'FETCH_CONTACTS',
        filters,
        sorts,
    };
};

export const clearContacts = () => {
    return {
        type: 'CLEAR_CONTACTS'
    };
};

export const setCheckedContact = (id) => {
    return  {
        type: 'SET_CHECKED_CONTACT',
        id,
    };
};

export const setCheckedContactAll = (checkedValue) => {
    return  {
        type: 'SET_CHECKED_CONTACT_ALL',
        checkedValue,
    };
};

export const deleteContact = (id) => {
    return  {
        type: 'DELETE_CONTACT',
        id,
    };
};

export const deleteSelectedContacts = () => {
    return  {
        type: 'DELETE_SELECTED_CONTACTS',
    };
};