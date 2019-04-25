export default function(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return !state;
        case 'TOGGLE_SIDEBAR_CLOSE':
            return (state = false);
        case 'TOGGLE_SIDEBAR_OPEN':
            return (state = true);
        default:
            return state;
    }

    return state;
}
