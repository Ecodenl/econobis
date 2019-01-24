export const fetchParticipantsProject = (filters, extraFilters, sorts, pagination, filterType, fetchFromProject) => {
    return {
        type: 'FETCH_PARTICIPANTS_PROJECT',
        filters,
        extraFilters,
        sorts,
        pagination,
        filterType,
        fetchFromProject,
    };
};

export const clearParticipantsProject = () => {
    return {
        type: 'CLEAR_PARTICIPANTS_PROJECT',
    };
};
