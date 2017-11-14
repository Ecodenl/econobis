export const fetchUserDetails = (payload) => {
    return {
        type: 'FETCH_USER_DETAILS',
        payload
    }
};

export const updateUser = (userDetails) => {
    return {
        type: 'UPDATE_USER',
        userDetails,
    };
};

export const deleteUser = (id) => {
    return  {
        type: 'DELETE_USER',
        id,
    };
};