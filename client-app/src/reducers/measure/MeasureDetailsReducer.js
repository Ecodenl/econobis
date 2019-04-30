export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_MEASURE_SUCCESS':
            return {
                ...action.measure,
            };
        case 'CLEAR_MEASURE':
            return (state.measure = []);
        default:
            return state;
    }
}
