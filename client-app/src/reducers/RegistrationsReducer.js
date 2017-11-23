export default function (state= [], action) {
    switch (action.type) {
    case 'FETCH_REGISTRATIONS_SUCCESS':
        return [
            ...action.registrations,
        ];
    case 'CLEAR_REGISTRATIONS':
        return state.registrations = [];
    default:
        return state;
    }
}