export const fetchEmails = (folder, filters, sorts, pagination ) => {
    return {
        type: 'FETCH_EMAILS',
        folder,
        filters,
        sorts,
        pagination,
    };
};

export const clearEmails = () => {
    return {
        type: 'CLEAR_EMAILS'
    };
};