export default function (state = [], action) {
    switch (action.type) {
        case 'SET_BULK_EMAIL_TO_CONTACT_IDS':
            return {
                toIds: action.ids,
            };
        default:
            return state;

    }
}