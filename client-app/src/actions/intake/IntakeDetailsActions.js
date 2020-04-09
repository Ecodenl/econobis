export const fetchIntakeDetails = payload => {
    return {
        type: 'FETCH_INTAKE_DETAILS',
        payload,
    };
};

export const updateIntake = intake => {
    return {
        type: 'UPDATE_INTAKE',
        intake,
    };
};

export const deleteIntake = (id, contactId = 0) => {
    return {
        type: 'DELETE_INTAKE',
        id,
        contactId,
    };
};

export const newIntakeMeasureRequested = measure => {
    return {
        type: 'NEW_INTAKE_MEASURE_REQUESTED',
        measure,
    };
};

export const deleteIntakeMeasureRequested = (intakeId, measureId) => {
    return {
        type: 'DELETE_INTAKE_MEASURE_REQUESTED',
        intakeId,
        measureId,
    };
};
