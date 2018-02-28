export const fetchParticipantProductionProjectDetails = (payload) => {
    return {
        type: 'FETCH_PARTICIPANT_PRODUCTION_PROJECT_DETAILS',
        payload
    }
};

export const clearParticipantProductionProject = () => {
    return {
        type: 'CLEAR_PARTICIPANT_PRODUCTION_PROJECT'
    };
};

export const updateParticipantProductionProject = (participantProductionProject) => {
    return {
        type: 'UPDATE_PARTICIPANT_PRODUCTION_PROJECT',
        participantProductionProject
    }
};

export const deleteParticipantProductionProject = (id) => {
    return {
        type: 'DELETE_PARTICIPANT_PRODUCTION_PROJECT',
        id
    }
};

export const newParticipationTransaction = (participationTransactions) => {
    return {
        type: 'NEW_PARTICIPATION_TRANSACTION',
        participationTransactions,
    };
};

export const updateParticipationTransaction = (participationTransactions) => {
    return {
        type: 'UPDATE_PARTICIPATION_TRANSACTION',
        participationTransactions,
    };
};

export const deleteParticipationTransaction = (id) => {
    return {
        type: 'DELETE_PARTICIPATION_TRANSACTION',
        id,
    };
};

export const newObligationNumber = (obligationNumber) => {
    return {
        type: 'NEW_OBLIGATION_NUMBER',
        obligationNumber,
    };
};

export const updateObligationNumber = (obligationNumber) => {
    return {
        type: 'UPDATE_OBLIGATION_NUMBER',
        obligationNumber,
    };
};

export const deleteObligationNumber = (id) => {
    return {
        type: 'DELETE_OBLIGATION_NUMBER',
        id,
    };
};