export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_ADMINISTRATIONS_SUCCESS':
            return [
                ...state,
                ...action.administrations.data.data
            ];
        case 'CLEAR_ADMINISTRATIONS':
            return state.administrations = [];
        case 'DELETE_ADMINISTRATION_SUCCESS':
            return state.filter((administration) => administration.id !== action.id);
        default:
            return state;
    }
}