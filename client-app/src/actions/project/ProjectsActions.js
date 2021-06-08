export const fetchProjects = (filters, sorts, pagination, filterType) => {
    return {
        type: 'FETCH_PROJECTS',
        filters,
        sorts,
        pagination,
        filterType,
    };
};

export const clearProjects = () => {
    return {
        type: 'CLEAR_PROJECTS',
    };
};
