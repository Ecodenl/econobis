export const fetchContactGroupDetails = (id) => ({
    type: 'FETCH_CONTACT_GROUP_DETAILS',
    id,
});

export const updateContactGroupDetails = (contactGroupDetails) => ({
    type: 'UPDATE_CONTACT_GROUP_DETAILS',
    contactGroupDetails
});
