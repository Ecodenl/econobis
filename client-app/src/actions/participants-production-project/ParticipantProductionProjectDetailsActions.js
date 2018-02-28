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