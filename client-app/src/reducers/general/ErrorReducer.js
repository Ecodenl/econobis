export default function(state = {}, action) {
    switch (action.type) {
        case 'SET_ERROR':
            return {
                http_code: action.http_code,
                message: action.message,
            };
        case 'CLEAR_ERROR':
            return (state.error = {});
        default:
            return state;
    }
}
