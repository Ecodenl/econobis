export const fetchProductionProjects = pagination => {
    return {
        type: 'FETCH_PRODUCTION_PROJECTS',
        pagination,
    };
};

export const clearProductionProjects = () => {
    return {
        type: 'CLEAR_PRODUCTION_PROJECTS',
    };
};
