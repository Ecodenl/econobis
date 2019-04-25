export const setNumberFilterInvoices = number => ({
    type: 'SET_NUMBER_FILTER_INVOICES',
    number,
});

export const setDateRequestedFilterInvoices = dateRequested => ({
    type: 'SET_DATE_REQUESTED_FILTER_INVOICES',
    dateRequested,
});

export const setSubjectFilterInvoices = subject => ({
    type: 'SET_SUBJECT_FILTER_INVOICES',
    subject,
});

export const setDaysToExpireFilterInvoices = daysToExpire => ({
    type: 'SET_DAYS_TO_EXPIRE_FILTER_INVOICES',
    daysToExpire,
});

export const setDaysLastReminderFilterInvoices = daysLastReminder => ({
    type: 'SET_DAYS_LAST_REMINDER_FILTER_INVOICES',
    daysLastReminder,
});

export const setContactFilterInvoices = contact => ({
    type: 'SET_CONTACT_FILTER_INVOICES',
    contact,
});

export const setPaymentTypeIdFilterInvoices = paymentTypeId => ({
    type: 'SET_PAYMENT_TYPE_ID_FILTER_INVOICES',
    paymentTypeId,
});

export const setStatusIdFilterInvoices = statusId => ({
    type: 'SET_STATUS_ID_FILTER_INVOICES',
    statusId,
});

export const clearFilterInvoices = () => ({
    type: 'CLEAR_FILTER_INVOICES',
});
