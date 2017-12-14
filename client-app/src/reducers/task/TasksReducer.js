export default function (state= [], action) {
    switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
        return [
            ...action.tasks.data.data,
        ];
    case 'CLEAR_TASKS':
        return state.tasks = [];
    default:
        return state;
    }
}