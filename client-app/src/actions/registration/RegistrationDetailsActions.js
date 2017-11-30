export const fetchRegistrationDetails = (payload) => {
    return {
        type: 'FETCH_REGISTRATION_DETAILS',
        payload
    }
};

export const updateRegistration = (registration) => {
    return {
        type: 'UPDATE_REGISTRATION',
        registration
    }
};

export const deleteRegistration = (id) => {
    return {
        type: 'DELETE_REGISTRATION',
        id
    }
};

export const newRegistrationMeasureTaken = (measureTaken) => {
    return {
        type: 'NEW_REGISTRATION_MEASURE_TAKEN',
        measureTaken,
    };
};

export const deleteRegistrationMeasureTaken = (id) => {
    return {
        type: 'DELETE_REGISTRATION_MEASURE_TAKEN',
        id,
    };
};

export const newRegistrationMeasureRequested = (measureRequested) => {
    return {
        type: 'NEW_REGISTRATION_MEASURE_REQUESTED',
        measureRequested,
    };
};

export const deleteRegistrationMeasureRequested = (id) => {
    return {
        type: 'DELETE_REGISTRATION_MEASURE_REQUESTED',
        id,
    };
};

export const newRegistrationNote = (note) => {
    return {
        type: 'NEW_REGISTRATION_NOTE',
        note,
    };
};

export const updateRegistrationNote = (note) => {
    return {
        type: 'UPDATE_REGISTRATION_NOTE',
        note,
    };
};

export const deleteRegistrationNote = (id) => {
    return {
        type: 'DELETE_REGISTRATION_NOTE',
        id,
    };
};

