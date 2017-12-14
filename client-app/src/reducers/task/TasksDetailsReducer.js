export default function (state= [], action) {
    switch (action.type) {
        case 'UPDATE_TASK':
            return {
                ...state,
                ...action.taskDetails,
            };
        default:
            return state;
    }
}