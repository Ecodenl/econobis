export const fetchHousingFileSpecifications = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_HOUSING_FILE_SPECIFICATIONS',
        filters,
        sorts,
        pagination,
    };
};

export const clearHousingFileSpecifications = () => {
    return {
        type: 'CLEAR_HOUSING_FILE_SPECIFICATIONS',
    };
};
