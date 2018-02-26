export const fetchProductionProject = (id) => {
    return {
        type: 'FETCH_PRODUCTION_PROJECT',
        id,
    };
};

export const clearProductionProject = () => {
    return {
        type: 'CLEAR_PRODUCTION_PROJECT'
    };
};
