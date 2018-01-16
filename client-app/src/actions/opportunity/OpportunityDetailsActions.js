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
