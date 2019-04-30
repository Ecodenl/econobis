export const fetchOpportunity = id => {
    return {
        type: 'FETCH_OPPORTUNITY',
        id,
    };
};

export const deleteOpportunity = id => {
    return {
        type: 'DELETE_OPPORTUNITY',
        id,
    };
};

export const clearOpportunity = () => {
    return {
        type: 'CLEAR_OPPORTUNITY',
    };
};
