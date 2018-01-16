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