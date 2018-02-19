export const fetchNotes = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_NOTES',
        filters,
        sorts,
        pagination,
    };
};

export const clearNotes = () => {
    return {
        type: 'CLEAR_NOTES'
    };
};
