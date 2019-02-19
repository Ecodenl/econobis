export const setQuotationRequestOrganisationFilter = organisation => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_ORGANISATION',
    organisation,
});

export const setQuotationRequestContactFilter = contact => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_CONTACT',
    contact,
});

export const setQuotationRequestAddressFilter = address => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_ADDRESS',
    address,
});

export const setQuotationRequestMeasureFilter = measure => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_MEASURE',
    measure,
});

export const setQuotationRequestCreatedAtFilter = createdAt => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_CREATED_AT',
    createdAt,
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

export const setQuotationRequestDateValidFilter = dateValid => ({
    type: 'SET_FILTER_QUOTATION_REQUEST_DATE_VALID',
    dateValid,
});

export const clearFilterQuotationRequests = () => ({
    type: 'CLEAR_FILTER_QUOTATION_REQUESTS',
});
