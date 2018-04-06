export const fetchParticipantsProductionProject = (filters, extraFilters, sorts, pagination, productionProjectId) => {
    return {
        type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT',
        filters,
        extraFilters,
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