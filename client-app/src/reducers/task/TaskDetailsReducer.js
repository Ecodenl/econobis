export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_TASK_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.taskDetails,
            };
        case 'UPDATE_TASK_DETAILS':
            return {
                ...state,
                ...action.task,
            };
        default:
            return state;
    }
}
