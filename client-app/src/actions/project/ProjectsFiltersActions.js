// SET_PROJECT_CODE_FILTER
export const setProjectCodeFilter = code => ({
    type: 'SET_PROJECT_CODE_FILTER',
    code,
});

// SET_PROJECT_FILTER
export const setProjectFilter = name => ({
    type: 'SET_PROJECT_FILTER',
    name,
});

// SET_TYPE_PROJECT_FILTER
export const setTypeProjectFilter = projectTypeId => ({
    type: 'SET_TYPE_PROJECT_FILTER',
    projectTypeId,
});

// CLEAR_FILTER_PROJECTS
export const clearFilterProjects = () => ({
    type: 'CLEAR_FILTER_PROJECTS',
});
