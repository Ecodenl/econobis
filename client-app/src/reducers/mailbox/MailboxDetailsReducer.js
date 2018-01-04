export default function (state= [], action) {
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
        default:
            return state;
    }
}