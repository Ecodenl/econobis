export const fetchMailgunDomains = () => {
    return {
        type: 'FETCH_MAILGUN_DOMAINS',
    };
};

export const clearMailgunDomains = () => {
    return {
        type: 'CLEAR_MAILGUN_DOMAINS',
    };
};
