export const fetchUserDetails = payload => {
    return {
        type: 'FETCH_USER_DETAILS',
        payload,
    };
};

export const updateUser = (user, switchToView) => {
    return {
        type: 'UPDATE_USER',
        user,
        switchToView,
    };
};

export const deleteUser = id => {
    return {
        type: 'DELETE_USER',
        id,
    };
};

export const updateRole = (id, value) => {
    return {
        type: 'UPDATE_ROLE',
        id,
        value,
    };
};
