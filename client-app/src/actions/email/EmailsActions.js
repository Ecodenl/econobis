export const fetchEmails = (folder, pagination) => {
    return {
        type: 'FETCH_EMAILS',
        folder,
        pagination,
    };
};

export const clearEmails = () => {
    return {
        type: 'CLEAR_EMAILS'
    };
};