export const setFilterContactGroupName = name => ({
    type: 'SET_FILTER_CONTACT_GROUP_NAME',
    name,
});

export const setFilterContactGroupStatus = status => ({
    type: 'SET_FILTER_CONTACT_GROUP_STATUS',
    status,
});

export const setFilterContactGroupTypeId = typeId => ({
    type: 'SET_FILTER_CONTACT_GROUP_TYPE_ID',
    typeId,
});

export const setFilterContactGroupCreatedById = createdById => ({
    type: 'SET_FILTER_CONTACT_GROUP_CREATED_BY_ID',
    createdById,
});

export const clearFilterContactGroups = () => ({
    type: 'CLEAR_FILTER_CONTACT_GROUPS',
});
