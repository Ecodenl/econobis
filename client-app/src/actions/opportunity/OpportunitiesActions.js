export const fetchOpportunities = () => {
    return {
        type: 'FETCH_OPPORTUNITIES',
    };
};

export const clearOpportunities = () => {
    return {
        type: 'CLEAR_OPPORTUNITIES'
    };
};

export const fetchOpportunity = (id) => {
    return {
        type: 'FETCH_OPPORTUNITY',
        id,
    };
};

export const clearOpportunity = () => {
    return {
        type: 'CLEAR_OPPORTUNITY'
    };
};
