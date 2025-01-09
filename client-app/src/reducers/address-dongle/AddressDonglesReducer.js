export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_ADDRESS_DONGLES_SUCCESS':
            return [...action.addressDongles];
        case 'CLEAR_ADDRESS_DONGLES':
            return (state.addressDongles = []);
        default:
            return state;
    }
}
