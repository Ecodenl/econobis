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

export const setTaskFinished = (task) => {
    return  {
        type: 'SET_TASK_FINISHED',
        task,
    };
};