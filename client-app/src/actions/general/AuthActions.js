export const authSuccess = () => {
    return {
        type: 'AUTH_USER',
    }
};

export const authLogout = () => {
    return {
        type: 'UNAUTH_USER',
    }
};
