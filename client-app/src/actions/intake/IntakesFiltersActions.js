export const setIntakeDateFilter = (createdAt) => ({
    type: 'SET_FILTER_INTAKE_DATE',
    createdAt,
});

export const setFilterFullName = (fullName) => ({
    type: 'SET_FILTER_INTAKE_FULL_NAME',
    fullName,
});

export const setFilterIntakeAddress = (address) => ({
    type: 'SET_FILTER_INTAKE_ADDRESS',
    address,
});

export const setFilterMeasureRequested = (measureRequested) => ({
    type: 'SET_FILTER_INTAKE_MEASURE_REQUESTED',
    measureRequested,
});

export const setFilterIntakeStatus = (statusId) => ({
    type: 'SET_FILTER_INTAKE_STATUS',
    statusId,
});

export const clearFilterIntakes = () => ({
    type: 'CLEAR_FILTER_INTAKES',
});