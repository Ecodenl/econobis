export const setIntakeStartDateFilter = createdAtStart => ({
    type: 'SET_FILTER_INTAKE_DATE_START',
    createdAtStart,
});
export const setIntakeEndDateFilter = createdAtEnd => ({
    type: 'SET_FILTER_INTAKE_DATE_END',
    createdAtEnd,
});

export const setFilterFullName = fullName => ({
    type: 'SET_FILTER_INTAKE_FULL_NAME',
    fullName,
});

export const setFilterIntakeAddress = address => ({
    type: 'SET_FILTER_INTAKE_ADDRESS',
    address,
});

export const setFilterIntakeAreaName = areaName => ({
    type: 'SET_FILTER_INTAKE_AREA_NAME',
    areaName,
});

export const setFilterIntakeCampaign = campaign => ({
    type: 'SET_FILTER_INTAKE_CAMPAIGN',
    campaign,
});

export const setFilterMeasureRequested = measureRequested => ({
    type: 'SET_FILTER_INTAKE_MEASURE_REQUESTED',
    measureRequested,
});

export const setFilterIntakeStatus = statusId => ({
    type: 'SET_FILTER_INTAKE_STATUS',
    statusId,
});

export const clearFilterIntakes = () => ({
    type: 'CLEAR_FILTER_INTAKES',
});
