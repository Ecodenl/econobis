export const fetchHousingFiles = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_HOUSING_FILES',
        filters,
        sorts,
        pagination,
    };
};

export const clearHousingFiles = () => {
    return {
        type: 'CLEAR_HOUSING_FILES',
    };
};
