export const fetchEmails = (folder) => {
    return {
        type: 'FETCH_EMAILS',
        folder,
    };
};

export const clearEmails = () => {
    return {
        type: 'CLEAR_EMAILS'
    };
};