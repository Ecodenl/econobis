export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_PARTICIPANT_PROJECT_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.participantProjectDetails,
            };
        case 'CLEAR_PARTICIPANT_PROJECT':
            return (state.participantProject = []);
        case 'UPDATE_PARTICIPANT_PROJECT':
            return {
                ...state,
                ...action.participantProjectDetails,
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
        case 'NEW_PARTICIPATION_MUTATION':
            return {
                ...state,
                participantMutations: action.participationMutations,
            };
        case 'UPDATE_PARTICIPATION_MUTATION':
            return {
                ...state,
                participantMutations: action.participationMutations,
            };
        case 'DELETE_PARTICIPATION_MUTATION':
            return {
                ...state,
                participantMutations: state.participantMutations.filter(
                    participantMutation => participantMutation.id !== action.id
                ),
            };
        default:
            return state;
    }
}
