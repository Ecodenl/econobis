export const setFilterFullName = (fullName) => ({
    type: 'SET_FILTER_INTAKE_FULL_NAME',
    fullName,
});

export const setIntakeDateFilter = (createdAt) => ({
    type: 'SET_FILTER_INTAKE_DATE',
    createdAt,
});

export const setFilterIntakeSource = (sourceId) => ({
    type: 'SET_FILTER_INTAKE_SOURCE',
    sourceId,
});

export const setFilterIntakeStatus = (statusId) => ({
    type: 'SET_FILTER_INTAKE_STATUS',
    statusId,
});

export const setFilterMeasureRequested = (measureRequested) => ({
    type: 'SET_FILTER_INTAKE_MEASURE_REQUESTED',
    measureRequested,
});

export const clearFilterIntake = () => ({
    type: 'CLEAR_FILTER_INTAKES',
});