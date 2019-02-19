export const fetchMailgunDomainDetails = id => {
    return {
        type: 'FETCH_MAILGUN_DOMAIN_DETAILS',
        id,
    };
};

export const updateMailgunDomain = (mailgunDomain, switchToView) => {
    return {
        type: 'UPDATE_MAILGUN_DOMAIN',
        mailgunDomain,
        switchToView,
    };
};
