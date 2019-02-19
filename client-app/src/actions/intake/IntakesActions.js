export const fetchIntakes = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_INTAKES',
        filters,
        sorts,
        pagination,
    };
};

export const setCheckedIntake = id => {
    return {
        type: 'SET_CHECKED_INTAKE',
        id,
    };
};

export const setCheckedIntakeAll = checkedValue => {
    return {
        type: 'SET_CHECKED_INTAKE_ALL',
        checkedValue,
    };
};

export const clearIntakes = () => {
    return {
        type: 'CLEAR_INTAKES',
    };
};
