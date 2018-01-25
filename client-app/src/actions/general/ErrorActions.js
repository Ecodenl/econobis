export const setError = (http_code) => {
    return {
        type: 'SET_ERROR',
        http_code,
    };
};

export const clearError = () => {
    return {
        type: 'CLEAR_ERROR'
    };
};