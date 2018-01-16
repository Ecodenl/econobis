export const fetchTasks = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_TASKS',
        filters,
        sorts,
        pagination,
    };
};

export const clearTasks = () => {
    return {
        type: 'CLEAR_TASKS'
    };
};

export const setTaskCompleted = (task) => {
    return  {
        type: 'SET_TASK_COMPLETED',
        task,
    };
};