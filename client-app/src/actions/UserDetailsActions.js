export const fetchUserDetails = (userDetails) => {
    return {
        type: 'FETCH_USER_DETAILS',
        userDetails,
    }
};