export const setQuotationRequestOrganisationOrCoachFilter = organisationOrCoach => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_ORGANISATION_OR_COACH',
    organisationOrCoach,
});

export const setQuotationRequestContactFilter = contact => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_CONTACT',
    contact,
});

export const setQuotationRequestAddressFilter = address => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_ADDRESS',
    address,
});

export const setQuotationRequestAreaNameFilter = areaName => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_AREA_NAME',
    areaName,
});

export const setQuotationRequestCampaignFilter = campaign => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_CAMPAIGN',
    campaign,
});

export const setQuotationRequestMeasureFilter = measure => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_MEASURE',
    measure,
});

export const setQuotationRequestCreatedAtStartFilter = createdAtStart => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_CREATED_AT_START',
    createdAtStart,
});

export const setQuotationRequestCreatedAtEndFilter = createdAtEnd => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_CREATED_AT_END',
    createdAtEnd,
});

export const setQuotationRequestDatePlannedFilter = datePlanned => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_DATE_PLANNED',
    datePlanned,
});

export const setQuotationRequestDateRecordedFilter = dateRecorded => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_DATE_RECORDED',
    dateRecorded,
});

export const setFilterQuotationRequestStatus = statusId => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_STATUS',
    statusId,
});

export const setQuotationRequestDateReleasedFilter = dateReleased => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_DATE_RELEASED',
    dateReleased,
});

export const clearFilterQuotationRequests = () => ({
    type: 'CLEAR_FILTER_QUOTATION_REQUESTS',
});
