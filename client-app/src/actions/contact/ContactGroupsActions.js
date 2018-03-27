export const addContactToGroup = contact => ({
    type: 'ADD_CONTACT_TO_GROUP',
    contact,
});

export const fetchContactGroups = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_CONTACT_GROUPS',
        filters,
        sorts,
        pagination,
    };
};

export const clearContactGroups = () => ({
    type: 'CLEAR_CONTACT_GROUPS',
});

export const deleteContactGroup = (id) => ({
    type: 'DELETE_CONTACT_GROUP',
    id,
});
