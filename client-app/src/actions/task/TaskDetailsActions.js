export const fetchTaskDetails = (id) => {
    return {
        type: 'FETCH_TASK_DETAILS',
        id
    }
};

export const updateTask = (task) => {
    return {
        type: 'UPDATE_TASK_DETAILS',
        task
    }
};
export const deleteTask = (id) => {
    return  {
        type: 'DELETE_TASK',
        id,
    };
};
