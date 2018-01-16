export default function (state= { isLoading: false }, action) {
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
        case 'SET_TASK_COMPLETED_SUCCESS':
        return {
            ...state,
            data: state.data.map((task) => {
                if (task.id === action.task.data.data.id) {
                    return {
                        ...task,
                        statusId: action.task.data.data.statusId,
                        statusCode: action.task.data.data.status.code,
                        statusName: action.task.data.data.status.name,
                    };
                } else {
                    return task;
                }
            })
        };
    case 'DELETE_TASK_SUCCESS':
        return {
            ...state,
            data: state.data.filter((task) => task.id !== action.id),
        };
    default:
        return state;
    }
}