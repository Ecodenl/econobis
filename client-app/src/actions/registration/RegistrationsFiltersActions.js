export const setFilterFullName = (fullName) => ({
    type: 'SET_FILTER_REGISTRATION_FULL_NAME',
    fullName,
});

export const setRegistrationDateFilter = (registrationDate) => ({
    type: 'SET_FILTER_REGISTRATION_DATE',
    registrationDate,
});

export const setFilterRegistrationSource = (sourceId) => ({
    type: 'SET_FILTER_REGISTRATION_SOURCE',
    sourceId,
});

export const setFilterRegistrationStatus = (statusId) => ({
    type: 'SET_FILTER_REGISTRATION_STATUS',
    statusId,
});
