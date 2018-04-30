export const fetchAdministrationDetails = (id) => {
    return {
        type: 'FETCH_ADMINISTRATION_DETAILS',
        id,
    }
};

export const updateAdministration = (administration, administrationId, switchToView) => {
    return {
        type: 'UPDATE_ADMINISTRATION',
        administration,
        administrationId,
        switchToView,
    }
};

export const addAdministrationUser = (administrationId, userId) => {
    return {
        type: 'ADD_ADMINISTRATION_USER',
        administrationId,
        userId,
    };
};

export const deleteAdministrationUser = (administrationId, userId) => {
    return {
        type: 'DELETE_ADMINISTRATION_USER',
        administrationId,
        userId,
    };
};