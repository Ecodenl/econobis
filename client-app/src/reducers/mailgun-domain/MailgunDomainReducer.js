export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_MAILGUN_DOMAINS_SUCCESS':
            return [...state, ...action.mailgunDomains.data.data];
        case 'CLEAR_MAILGUN_DOMAINS':
            return (state.mailgunDomains = []);
        default:
            return state;
    }
}
