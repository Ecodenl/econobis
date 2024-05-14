export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_TASKS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_TASKS_SUCCESS':
            return {
                data: action.tasks.data.data,
                meta: {
                    total: action.tasks.data.meta.total,
                    taskIdsTotal: action.tasks.data.meta.taskIdsTotal,
                },
                isLoading: false,
            };
        case 'CLEAR_TASKS':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        case 'SET_TASK_FINISHED_SUCCESS':
            return {
                ...state,
                data: state.data.filter(task => task.id !== action.id),
            };
        case 'DELETE_TASK_SUCCESS':
            return {
                ...state,
                data: state.data.filter(task => task.id !== action.id),
            };
        default:
            return state;
    }
}
