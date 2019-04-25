export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_USERS_SUCCESS':
            return [...state, ...action.users];
        case 'CLEAR_USERS':
            return (state.users = []);
        default:
            return state;
    }
}
