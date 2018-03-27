export const setFilterContactGroupName = (name) => ({
    type: 'SET_FILTER_CONTACT_GROUP_NAME',
    name,
});

export const setFilterContactGroupStatus = (status) => ({
    type: 'SET_FILTER_CONTACT_GROUP_STATUS',
    status,
});

export const clearFilterContactGroups = () => ({
    type: 'CLEAR_FILTER_CONTACT_GROUPS',
});