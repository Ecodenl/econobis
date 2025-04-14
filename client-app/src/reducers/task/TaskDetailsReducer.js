const initialState = {
    task: {},
    deleteSuccess: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_TASK_DETAILS_SUCCESS':
            return {
                ...state,
                task: {
                    ...action.taskDetails.data.data,
                },
                deleteSuccess: false, // reset bij ophalen nieuwe task
            };
        case 'UPDATE_TASK_DETAILS':
            return {
                ...state,
                task: {
                    ...state.task,
                    ...action.task,
                },
            };
        case 'DELETE_TASK_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_TASK_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        default:
            return state;
    }
}
