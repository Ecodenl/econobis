export const setFilterEmailDate = date => ({
    type: 'SET_FILTER_EMAIL_DATE',
    date,
});

export const setFilterEmailMailbox = mailbox => ({
    type: 'SET_FILTER_EMAIL_MAILBOX',
    mailbox,
});

export const setFilterEmailSentBy = sentBy => ({
    type: 'SET_FILTER_EMAIL_SENT_BY',
    sentBy,
});

export const setFilterEmailTo = to => ({
    type: 'SET_FILTER_EMAIL_TO',
    to,
});

export const setFilterEmailContact = contact => ({
    type: 'SET_FILTER_EMAIL_CONTACT',
    contact,
});

export const setFilterEmailSubject = subject => ({
    type: 'SET_FILTER_EMAIL_SUBJECT',
    subject,
});

export const setFilterEmailStatusId = statusId => ({
    type: 'SET_FILTER_EMAIL_STATUS_ID',
    statusId,
});

export const setFilterResponsibleName = responsibleName => ({
    type: 'SET_FILTER_EMAIL_RESPONSIBLE_NAME',
    responsibleName,
});

// todo WM: Eigen e-mail gaat niet meer vanuit oude mail, eigen e-mail gaat nu naar nieuwe splitview
// export const setFilterMe = me => ({
//     type: 'SET_FILTER_EMAIL_ME',
//     me,
// });

export const clearFilterEmail = () => ({
    type: 'CLEAR_FILTER_EMAIL',
});
