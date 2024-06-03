export const fetchContacts = (filters, extraFilters, sorts, pagination, filterType, dataControleType) => {
    return {
        type: 'FETCH_CONTACTS',
        filters,
        extraFilters,
        sorts,
        pagination,
        filterType,
        dataControleType,
    };
};

export const clearContacts = () => {
    return {
        type: 'CLEAR_CONTACTS',
    };
};

export const setCheckedContact = id => {
    return {
        type: 'SET_CHECKED_CONTACT',
        id,
    };
};

export const setCheckedContactAll = checkedValue => {
    return {
        type: 'SET_CHECKED_CONTACT_ALL',
        checkedValue,
    };
};

export const deleteContact = id => {
    return {
        type: 'DELETE_CONTACT',
        id,
    };
};

export const deleteSelectedContacts = contactIds => {
    return {
        type: 'DELETE_SELECTED_CONTACTS',
        contactIds,
    };
};

export const mergeSelectedContacts = contactIds => {
    return {
        type: 'MERGE_SELECTED_CONTACTS',
        contactIds,
    };
};
