export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_MAILBOX_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.mailboxDetails.data.data,
            };
        case 'UPDATE_MAILBOX_DETAILS':
            return {
                ...state,
                ...action.mailbox.data.data,
            };
        case 'NEW_MAILBOX_USER':
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        ...action.mailboxUser,
                    },
                ],
            };
        case 'DELETE_MAILBOX_USER_SUCCESS':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.userId),
            };
        case 'NEW_MAILBOX_IGNORE':
            return {
                ...state,
                mailboxIgnores: [
                    ...state.mailboxIgnores,
                    {
                        ...action.ignore,
                    },
                ],
            };
        case 'DELETE_MAILBOX_IGNORE_SUCCESS':
            return {
                ...state,
                mailboxIgnores: state.mailboxIgnores.filter(ignore => ignore.id !== action.ignoreId),
            };
        default:
            return state;
    }
}
