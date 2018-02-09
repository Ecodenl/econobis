export const fetchIntakeDetails = (payload) => {
    return {
        type: 'FETCH_INTAKE_DETAILS',
        payload
    }
};

export const updateIntake = (intake) => {
    return {
        type: 'UPDATE_INTAKE',
        intake
    }
};

export const deleteIntake = (id) => {
    return {
        type: 'DELETE_INTAKE',
        id
    }
};

export const newIntakeMeasureTaken = (measureTaken) => {
    return {
        type: 'NEW_INTAKE_MEASURE_TAKEN',
        measureTaken,
    };
};

export const deleteIntakeMeasureTaken = (id) => {
    return {
        type: 'DELETE_INTAKE_MEASURE_TAKEN',
        id,
    };
};

export const newIntakeMeasureRequested = (measureRequested) => {
    return {
        type: 'NEW_INTAKE_MEASURE_REQUESTED',
        measureRequested,
    };
};

export const deleteIntakeMeasureRequested = (id) => {
    return {
        type: 'DELETE_INTAKE_MEASURE_REQUESTED',
        id,
    };
};

export const newIntakeNote = (note) => {
    return {
        type: 'NEW_INTAKE_NOTE',
        note,
    };
};

export const updateIntakeNote = (note) => {
    return {
        type: 'UPDATE_INTAKE_NOTE',
        note,
    };
};

export const deleteIntakeNote = (id) => {
    return {
        type: 'DELETE_INTAKE_NOTE',
        id,
    };
};

