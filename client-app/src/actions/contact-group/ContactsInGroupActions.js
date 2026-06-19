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
