export const fetchParticipantsProductionProject = (filters, sorts, pagination, productionProjectId) => {
    return {
        type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT',
        filters,
        sorts,
        pagination,
        productionProjectId,
    };
};

export const clearParticipantsProductionProject = () => {
    return {
        type: 'CLEAR_PARTICIPANTS_PRODUCTION_PROJECT'
    };
};