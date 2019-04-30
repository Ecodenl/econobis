export const fetchOpportunities = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_OPPORTUNITIES',
        filters,
        sorts,
        pagination,
    };
};

export const clearOpportunities = () => {
    return {
        type: 'CLEAR_OPPORTUNITIES',
    };
};

export const setCheckedOpportunity = id => {
    return {
        type: 'SET_CHECKED_OPPORTUNITY',
        id,
    };
};

export const setCheckedOpportunityAll = checkedValue => {
    return {
        type: 'SET_CHECKED_OPPORTUNITY_ALL',
        checkedValue,
    };
};
