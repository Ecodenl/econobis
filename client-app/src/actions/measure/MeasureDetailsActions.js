export const fetchMeasure = id => {
    return {
        type: 'FETCH_MEASURE',
        id,
    };
};

export const clearMeasure = () => {
    return {
        type: 'CLEAR_MEASURE',
    };
};
