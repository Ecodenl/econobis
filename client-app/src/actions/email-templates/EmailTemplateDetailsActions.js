export const fetchEmailTemplate = (id) => {
    return {
        type: 'FETCH_EMAIL_TEMPLATE',
        id,
    };
};

export const deleteEmailTemplate = (id) => {
    return {
        type: 'DELETE_EMAIL_TEMPLATE',
        id,
    };
};

export const clearEmailTemplate = () => {
    return {
        type: 'CLEAR_EMAIL_TEMPLATE'
    };
};