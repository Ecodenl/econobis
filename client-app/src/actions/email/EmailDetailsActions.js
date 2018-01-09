export const fetchEmail = (id) => {
    return {
        type: 'FETCH_EMAIL',
        id,
    };
};

export const clearEmail = () => {
    return {
        type: 'CLEAR_EMAIL'
    };
};