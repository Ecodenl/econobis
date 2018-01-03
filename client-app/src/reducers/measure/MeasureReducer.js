export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_MEASURES_SUCCESS':
            return [
                ...action.measures,
            ];
        case 'FETCH_MEASURE_SUCCESS':
            return {
                ...action.measure,
            };
        case 'CLEAR_MEASURES':
            return state.measures = [];
        case 'CLEAR_MEASURE':
            return state.measure = [];
        default:
            return state;
    }
}