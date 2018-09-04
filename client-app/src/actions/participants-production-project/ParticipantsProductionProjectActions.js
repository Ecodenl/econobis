export const fetchParticipantsProductionProject = (filters, extraFilters, sorts, pagination, productionProjectId, filterType) => {
    return {
        type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT',
        filters,
        extraFilters,
        sorts,
        pagination,
        productionProjectId,
        filterType
    };
};

export const clearParticipantsProductionProject = () => {
    return {
        type: 'CLEAR_PARTICIPANTS_PRODUCTION_PROJECT'
    };
};