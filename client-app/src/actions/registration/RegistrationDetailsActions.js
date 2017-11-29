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

export const newRegistrationMeasureTaken = (measureTaken) => {
    return {
        type: 'NEW_REGISTRATION_MEASURE_TAKEN',
        measureTaken,
    };
};

export const updateRegistrationMeasureTaken = (measureTaken) => {
    return {
        type: 'UPDATE_REGISTRATION_MEASURE_TAKEN',
        measureTaken,
    };
};

export const deleteRegistrationMeasureTaken = (id) => {
    return {
        type: 'DELETE_REGISTRATION_MEASURE_TAKEN',
        id,
    };
};