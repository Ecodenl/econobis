export const deleteTask = (id) => {
    return  {
        type: 'DELETE_TASK',
        id,
    };
};
