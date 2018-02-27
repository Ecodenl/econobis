export const fetchParticipantsProductionProject = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT',
        filters,
        sorts,
        pagination,
    };
};

export const clearParticipantsProductionProject = () => {
    return {
        type: 'CLEAR_PARTICIPANTS_PRODUCTION_PROJECT'
    };
};