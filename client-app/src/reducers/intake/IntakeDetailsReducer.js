export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_INTAKE_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.intakeDetails,
                deleteSuccess: false,
            };
        case 'UPDATE_INTAKE':
            return {
                ...state,
                ...action.intakeDetails,
            };
        case 'DELETE_INTAKE_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_INTAKE_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        case 'NEW_INTAKE_MEASURE_REQUESTED':
            return {
                ...state,
                measuresRequested: [
                    ...state.measuresRequested,
                    {
                        ...action.measure,
                    },
                ],
            };
        case 'DELETE_INTAKE_MEASURE_REQUESTED_SUCCESS':
            return {
                ...state,
                measuresRequested: state.measuresRequested.filter(
                    measureRequested => measureRequested.id !== action.measureId
                ),
            };
        default:
            return state;
    }
}
