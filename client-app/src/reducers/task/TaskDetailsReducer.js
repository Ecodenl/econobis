const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_TASK_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.taskDetails,
                deleteSuccess: false,
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
