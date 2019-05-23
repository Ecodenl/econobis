export const setFilterParticipantProjectId = id => ({
    type: 'SET_FILTER_PROJECT_PARTICIPANT_ID',
    id,
});

export const setFilterParticipantProjectContactType = contactType => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_CONTACT_TYPE',
    contactType,
});

export const setFilterParticipantProjectName = name => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_NAME',
    name,
});

export const setFilterParticipantProjectAddress = address => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_ADDRESS',
    address,
});

export const setFilterParticipantProjectPostalCode = postalCode => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_POSTAL_CODE',
    postalCode,
});

export const setFilterParticipantProjectCity = city => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_CITY',
    city,
});

export const setFilterParticipantProjectStatusId = statusId => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_STATUS_ID',
    statusId,
});

export const setFilterParticipantProjectCurrentParticipations = currentParticipations => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_CURRENT_PARTICIPATIONS',
    currentParticipations,
});

export const setFilterParticipantMutationStatusId = participantMutationStatusId => ({
    type: 'SET_FILTER_PARTICIPANT_MUTATION_STATUS_ID',
    participantMutationStatusId,
});

export const setFilterParticipantProjectDateRegister = dateRegister => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_DATE_REGISTER',
    dateRegister,
});

export const setFilterParticipantProjectEnergySupplierId = energySupplierId => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_ENERGY_SUPPLIER_ID',
    energySupplierId,
});

export const setFilterProjectId = projectId => ({
    type: 'SET_FILTER_PARTICIPANT_PROJECT_ID',
    projectId,
});

export const clearFilterParticipantsProject = () => ({
    type: 'CLEAR_FILTER_PARTICIPANTS_PROJECT',
});
