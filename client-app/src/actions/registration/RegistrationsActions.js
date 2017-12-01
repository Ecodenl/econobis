export const fetchRegistrations = (filters, sorts) => {
    return {
        type: 'FETCH_REGISTRATIONS',
        filters,
        sorts,
    };
};

export const clearRegistrations = () => {
    return {
        type: 'CLEAR_REGISTRATIONS'
    };
};