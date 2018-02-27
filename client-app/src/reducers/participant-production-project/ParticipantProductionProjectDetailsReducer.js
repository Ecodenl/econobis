export default function (state= {}, action) {
    switch(action.type) {
        case 'FETCH_PARTICIPANT_PRODUCTION_PROJECT_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.participantProductionProjectDetails,
            };
        case 'CLEAR_PARTICIPANT_PRODUCTION_PROJECT':
            return state.participantProductionProject = [];
        case 'UPDATE_PARTICIPANT_PRODUCTION_PROJECT':
            return {
                ...state,
                ...action.participantProductionProjectDetails,
            };
        default:
            return state;
    }
}