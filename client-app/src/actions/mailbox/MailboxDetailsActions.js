export const fetchMailboxDetails = (id) => {
    return {
        type: 'FETCH_MAILBOX_DETAILS',
        id,
    }
};

export const updateMailbox = (mailbox) => {
    return {
        type: 'UPDATE_MAILBOX_DETAILS',
        mailbox,
    }
};

export const deleteMailbox = (id) => {
    return  {
        type: 'DELETE_MAILBOX',
        id,
    };
};

export const newMailboxUser = (mailboxUser) => {
    return {
        type: 'NEW_MAILBOX_USER',
        mailboxUser,
    };
};

export const deleteMailboxUser = (mailboxId, userId) => {
    return {
        type: 'DELETE_MAILBOX_USER',
        mailboxId,
        userId,
    };
};

export const newMailboxIgnore = (ignore) => {
    return {
        type: 'NEW_MAILBOX_IGNORE',
        ignore,
    };
};

export const deleteMailboxIgnore = (ignoreId) => {
    return {
        type: 'DELETE_MAILBOX_IGNORE',
        ignoreId,
    };
};