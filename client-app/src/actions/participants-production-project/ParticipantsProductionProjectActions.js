export const fetchParticipantsProductionProject = (filters, extraFilters, sorts, pagination, filterType, fetchFromProductionProject) => {
    return {
        type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT',
        filters,
        extraFilters,
        sorts,
        pagination,
        filterType,
        fetchFromProductionProject
    };
};

export const clearParticipantsProductionProject = () => {
    return {
        type: 'CLEAR_PARTICIPANTS_PRODUCTION_PROJECT'
    };
};