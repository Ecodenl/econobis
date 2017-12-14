export const fetchTasks = (filters, sorts) => {
    return {
        type: 'FETCH_TASKS',
        filters,
        sorts,
    };
};

export const clearTasks = () => {
    return {
        type: 'CLEAR_TASKs'
    };
};