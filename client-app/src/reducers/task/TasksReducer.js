export default function (state= [], action) {
    switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
        return [
            ...action.tasks.data.data,
        ];
    case 'CLEAR_TASKS':
        return state.tasks = [];
    case 'SET_TASK_COMPLETED_SUCCESS':
        return state.map((task) => {
            if (task.id === action.task.data.data.id) {
                return {
                    ...task,
                    statusId: action.task.data.data.statusId,
                    statusCode: action.task.data.data.statusCode,
                    statusName: action.task.data.data.status.name,
                };
            } else {
                return task;
            }
        });
    case 'DELETE_TASK_SUCCESS':
        return state.filter((task) => task.id !== action.id);
    default:
        return state;
    }
}