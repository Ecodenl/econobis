export const fetchMeasures = () => {
    return {
        type: 'FETCH_MEASURES',
    };
};

export const clearMeasures = () => {
    return {
        type: 'CLEAR_MEASURES'
    };
};

export const fetchMeasure = (id) => {
    return {
        type: 'FETCH_MEASURE',
        id,
    };
};

export const clearMeasure = () => {
    return {
        type: 'CLEAR_MEASURE'
    };
};
