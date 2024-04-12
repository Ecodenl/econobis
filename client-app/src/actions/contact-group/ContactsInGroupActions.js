// todo WM: opschonen ContactsInGroup
// export const fetchContactsInGroup = contactGroup => {
//     return {
//         type: 'FETCH_CONTACTS_IN_GROUP',
//         contactGroup,
//     };
// };

// todo WM: opschonen ContactsInGroup
// export const clearContactsInGroup = () => {
//     return {
//         type: 'CLEAR_CONTACTS_IN_GROUP',
//     };
// };

export const deleteContactInGroup = (contactGroup, id) => {
    return {
        type: 'DELETE_CONTACT_IN_GROUP',
        contactGroup,
        id,
    };
};

export const updateContactInGroup = (contactGroup, id, memberToGroupSince) => {
    return {
        type: 'UPDATE_CONTACT_IN_GROUP',
        contactGroup,
        id,
        memberToGroupSince,
    };
};
