export const fetchProjects = pagination => {
    return {
        type: 'FETCH_PROJECTS',
        pagination,
    };
};

export const clearProjects = () => {
    return {
        type: 'CLEAR_PROJECTS',
    };
};
