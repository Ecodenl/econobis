export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_MAILGUN_DOMAIN_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.mailgunDomainDetails.data.data,
            };
        case 'UPDATE_MAILGUN_DOMAIN_SUCCESS':
            return {
                ...state,
                ...action.mailgunDomainDetails,
            };
        default:
            return state;
    }
}
