export default function (state= [], action) {
    switch (action.type) {
    case 'FETCH_MAILBOXES_SUCCESS':
        return [
            ...action.mailboxes.data.data,
        ];
    case 'CLEAR_MAILBOXES':
        return state.mailboxes = [];
    case 'DELETE_MAILBOX_SUCCESS':
        return state.filter((mailbox) => mailbox.id !== action.id);
    default:
        return state;
    }
}