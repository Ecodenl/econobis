export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_MEASURES_SUCCESS':
            return [
                ...action.measures,
            ];
        case 'CLEAR_MEASURES':
            return state.measures = [];
        default:
            return state;
    }
}