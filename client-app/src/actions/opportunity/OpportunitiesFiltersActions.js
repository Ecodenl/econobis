export const setFilterOpportunityNumber = number => ({
    type: 'SET_FILTER_OPPORTUNITY_NUMBER',
    number,
});

export const setFilterOpportunityCreatedAtStart = createdAtStart => ({
    type: 'SET_FILTER_OPPORTUNITY_CREATED_AT_START',
    createdAtStart,
});

export const setFilterOpportunityCreatedAtEnd = createdAtEnd => ({
    type: 'SET_FILTER_OPPORTUNITY_CREATED_AT_END',
    createdAtEnd,
});

export const setFilterOpportunityName = name => ({
    type: 'SET_FILTER_OPPORTUNITY_NAME',
    name,
});

export const setFilterOpportunityMeasureCategory = measureCategory => ({
    type: 'SET_FILTER_OPPORTUNITY_MEASURE_CATEGORY',
    measureCategory,
});

export const setFilterOpportunityCampaign = campaign => ({
    type: 'SET_FILTER_OPPORTUNITY_CAMPAIGN',
    campaign,
});

export const setFilterOpportunityStatusId = statusId => ({
    type: 'SET_FILTER_OPPORTUNITY_STATUS_ID',
    statusId,
});

export const setFilterOpportunityAmountOfQuotationRequests = amountOfQuotationRequests => ({
    type: 'SET_FILTER_OPPORTUNITY_AMOUNT_OF_QUOTATION_REQUESTS',
    amountOfQuotationRequests,
});

export const clearFilterOpportunity = () => ({
    type: 'CLEAR_FILTER_OPPORTUNITY',
});
