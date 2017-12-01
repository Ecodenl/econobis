export const addContactToGroup = contact => ({
    type: 'ADD_CONTACT_TO_GROUP',
    contact,
});

export const fetchContactGroups = () => ({
    type: 'FETCH_CONTACT_GROUPS',
});

export const clearContactGroups = () => ({
    type: 'CLEAR_CONTACT_GROUPS',
});

export const deleteContactGroup = (id) => ({
    type: 'DELETE_CONTACT_GROUP',
    id,
});
