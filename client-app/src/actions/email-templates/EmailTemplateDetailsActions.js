export const fetchEmailTemplate = id => {
    return {
        type: 'FETCH_EMAIL_TEMPLATE',
        id,
    };
};

export const deleteEmailTemplate = (id, callback) => {
    return {
        type: 'DELETE_EMAIL_TEMPLATE',
        id,
        callback,
    };
};

export const clearEmailTemplate = () => {
    return {
        type: 'CLEAR_EMAIL_TEMPLATE',
    };
};
