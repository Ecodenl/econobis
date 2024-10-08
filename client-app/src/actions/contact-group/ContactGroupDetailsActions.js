export const fetchContactGroupDetails = id => ({
    type: 'FETCH_CONTACT_GROUP_DETAILS',
    id,
});

export const updateContactGroupDetails = contactGroupDetails => ({
    type: 'UPDATE_CONTACT_GROUP_DETAILS',
    contactGroupDetails,
});

export const clearContactGroupDetails = () => ({
    type: 'CLEAR_CONTACT_GROUP_DETAILS',
});

export const deleteComposedGroup = (contactGroupId, contactGroupToDetachId) => ({
    type: 'DELETE_COMPOSED_GROUP',
    contactGroupId,
    contactGroupToDetachId,
});

export const attachComposedGroup = (contactGroupId, contactGroupToAttachId) => ({
    type: 'ATTACH_COMPOSED_GROUP',
    contactGroupId,
    contactGroupToAttachId,
});

export const deleteComposedExceptGroup = (contactGroupId, contactGroupToDetachId) => ({
    type: 'DELETE_COMPOSED_EXCEPT_GROUP',
    contactGroupId,
    contactGroupToDetachId,
});

export const attachComposedExceptGroup = (contactGroupId, contactGroupToAttachId) => ({
    type: 'ATTACH_COMPOSED_EXCEPT_GROUP',
    contactGroupId,
    contactGroupToAttachId,
});

export const updateContactGroupLapostaList = lapostaListId => {
    return {
        type: 'UPDATE_LAPOSTA_LIST_ID',
        lapostaListId,
    };
};

export const deActivateContactGroupLapostaList = lapostaListId => {
    return {
        type: 'DEACTIVATE_LAPOSTA_LIST_ID',
        lapostaListId,
    };
};
