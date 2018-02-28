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
        case 'NEW_PARTICIPATION_TRANSACTION':
            return {
                ...state,
                participantTransactions: action.participationTransactions
            };
        case 'UPDATE_PARTICIPATION_TRANSACTION':
            return {
                ...state,
                participantTransactions: action.participationTransactions
            };
        case 'DELETE_PARTICIPATION_TRANSACTION':
            return {
                ...state,
                participantTransactions: state.participantTransactions.filter((participantTransaction) => participantTransaction.id !== action.id),
            };
        default:
            return state;
    }
}