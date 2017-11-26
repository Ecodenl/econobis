export const fetchContactsInGroup = (contactGroup) => {
    return {
        type: 'FETCH_CONTACTS_IN_GROUP',
        contactGroup,
    };
};

export const clearContactsInGroup = () => {
    return {
        type: 'CLEAR_CONTACTS_IN_GROUP'
    };
};

export const deleteContactInGroup = (id) => {
    return  {
        type: 'DELETE_CONTACT_IN_GROUP',
        id,
    };
};