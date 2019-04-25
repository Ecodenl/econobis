export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_PARTICIPANT_PRODUCTION_PROJECT_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.participantProductionProjectDetails,
            };
        case 'CLEAR_PARTICIPANT_PRODUCTION_PROJECT':
            return (state.participantProductionProject = []);
        case 'UPDATE_PARTICIPANT_PRODUCTION_PROJECT':
            return {
                ...state,
                ...action.participantProductionProjectDetails,
            };
        case 'NEW_PARTICIPATION_TRANSACTION':
            return {
                ...state,
                participantTransactions: action.participationTransactions,
            };
        case 'UPDATE_PARTICIPATION_TRANSACTION':
            return {
                ...state,
                participantTransactions: action.participationTransactions,
            };
        case 'DELETE_PARTICIPATION_TRANSACTION':
            return {
                ...state,
                participantTransactions: state.participantTransactions.filter(
                    participantTransaction => participantTransaction.id !== action.id
                ),
            };
        case 'NEW_OBLIGATION_NUMBER':
            return {
                ...state,
                obligationNumbers: [
                    ...state.obligationNumbers,
                    {
                        ...action.obligationNumber,
                    },
                ],
            };
        case 'UPDATE_OBLIGATION_NUMBER':
            return {
                ...state,
                obligationNumbers: state.obligationNumbers.map(obligationNumber =>
                    obligationNumber.id === action.obligationNumber.id
                        ? {
                              ...obligationNumber,
                              number: action.obligationNumber.number,
                          }
                        : obligationNumber
                ),
            };
        case 'DELETE_OBLIGATION_NUMBER':
            return {
                ...state,
                obligationNumbers: state.obligationNumbers.filter(
                    obligationNumber => obligationNumber.id !== action.id
                ),
            };
        default:
            return state;
    }
}
