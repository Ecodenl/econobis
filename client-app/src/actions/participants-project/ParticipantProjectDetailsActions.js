export const fetchParticipantProjectDetails = payload => {
    return {
        type: 'FETCH_PARTICIPANT_PROJECT_DETAILS',
        payload,
    };
};

export const clearParticipantProject = () => {
    return {
        type: 'CLEAR_PARTICIPANT_PROJECT',
    };
};

export const updateParticipantProject = participantProject => {
    return {
        type: 'UPDATE_PARTICIPANT_PROJECT',
        participantProject,
    };
};

export const deleteParticipantProject = id => {
    return {
        type: 'DELETE_PARTICIPANT_PROJECT',
        id,
    };
};

export const newParticipationMutation = participationMutations => {
    return {
        type: 'NEW_PARTICIPATION_MUTATION',
        participationMutations,
    };
};

export const updateParticipationMutation = participationMutations => {
    return {
        type: 'UPDATE_PARTICIPATION_MUTATION',
        participationMutations,
    };
};

export const deleteParticipationMutation = id => {
    return {
        type: 'DELETE_PARTICIPATION_MUTATION',
        id,
    };
};

export const newObligationNumber = obligationNumber => {
    return {
        type: 'NEW_OBLIGATION_NUMBER',
        obligationNumber,
    };
};

export const updateObligationNumber = obligationNumber => {
    return {
        type: 'UPDATE_OBLIGATION_NUMBER',
        obligationNumber,
    };
};

export const deleteObligationNumber = id => {
    return {
        type: 'DELETE_OBLIGATION_NUMBER',
        id,
    };
};
