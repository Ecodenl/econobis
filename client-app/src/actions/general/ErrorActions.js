export const setError = (http_code, message) => {
    return {
        type: 'SET_ERROR',
        http_code,
        message,
    };
};

export const clearError = () => {
    return {
        type: 'CLEAR_ERROR',
    };
};
