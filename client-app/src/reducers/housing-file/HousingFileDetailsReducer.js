export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_HOUSING_FILE_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.housingFileDetails,
            };
        case 'UPDATE_HOUSING_FILE':
            return {
                ...state,
                ...action.housingFileDetails,
            };
        case 'NEW_HOUSING_FILE_MEASURE_TAKEN':
            return {
                ...state,
                address: {
                    ...action.address,
                },
            };
        case 'DELETE_HOUSING_FILE_MEASURE_TAKEN_SUCCESS':
            return {
                ...state,
                address: {
                    ...state.address,
                    measuresTaken: state.address.measuresTaken.filter(
                        measureTaken => measureTaken.id !== action.measureId
                    ),
                },
            };
        default:
            return state;
    }
}
