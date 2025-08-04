export const fetchMailboxes = (onlyActive) => {
    return {
        type: 'FETCH_MAILBOXES',
        onlyActive,
    };
};

export const clearMailboxes = () => {
    return {
        type: 'CLEAR_MAILBOXES',
    };
};
