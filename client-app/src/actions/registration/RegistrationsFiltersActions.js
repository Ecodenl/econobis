export const setFilterFullName = (fullName) => ({
    type: 'SET_FILTER_REGISTRATION_FULL_NAME',
    fullName,
});

export const setRegistrationDateFilter = (createdAt) => ({
    type: 'SET_FILTER_REGISTRATION_DATE',
    createdAt,
});

export const setFilterRegistrationSource = (sourceId) => ({
    type: 'SET_FILTER_REGISTRATION_SOURCE',
    sourceId,
});

export const setFilterRegistrationStatus = (statusId) => ({
    type: 'SET_FILTER_REGISTRATION_STATUS',
    statusId,
});

export const setFilterMeasureRequested = (measureRequested) => ({
    type: 'SET_FILTER_REGISTRATION_MEASURE_REQUESTED',
    measureRequested,
});

export const clearFilterRegistration = () => ({
    type: 'CLEAR_FILTER_REGISTRATIONS',
});