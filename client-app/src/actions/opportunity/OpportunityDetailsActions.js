export const fetchOpportunity = id => {
    return {
        type: 'FETCH_OPPORTUNITY',
        id,
    };
};

export const deleteOpportunity = (id, contactId = 0) => {
    return {
        type: 'DELETE_OPPORTUNITY',
        id,
        contactId,
    };
};

export const clearOpportunity = () => {
    return {
        type: 'CLEAR_OPPORTUNITY',
    };
};
