export const fetchOpportunities = (pagination) => {
    return {
        type: 'FETCH_OPPORTUNITIES',
        pagination
    };
};

export const clearOpportunities = () => {
    return {
        type: 'CLEAR_OPPORTUNITIES'
    };
};

export const setCheckedOpportunity = (id) => {
    return  {
        type: 'SET_CHECKED_OPPORTUNITY',
        id,
    };
};

export const setCheckedOpportunityAll = (checkedValue) => {
    return  {
        type: 'SET_CHECKED_OPPORTUNITY_ALL',
        checkedValue,
    };
};