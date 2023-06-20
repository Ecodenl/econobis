export const fetchHousingFileSpecifications = (filters, extraFilters, sorts, pagination) => {
    return {
        type: 'FETCH_HOUSING_FILE_SPECIFICATIONS',
        filters,
        extraFilters,
        sorts,
        pagination,
    };
};

export const clearHousingFileSpecifications = () => {
    return {
        type: 'CLEAR_HOUSING_FILE_SPECIFICATIONS',
    };
};
