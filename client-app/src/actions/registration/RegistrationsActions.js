export const fetchRegistrations = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_REGISTRATIONS',
        filters,
        sorts,
        pagination,
    };
};

export const clearRegistrations = () => {
    return {
        type: 'CLEAR_REGISTRATIONS'
    };
};