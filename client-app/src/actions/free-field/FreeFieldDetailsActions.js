export const fetchFreeFieldDetails = freeField => {
    return {
        type: 'FETCH_FREE_FIELD_DETAILS',
        id,
    };
};

export const updateFreeField = freeField => {
    return {
        type: 'UPDATE_FREE_FIELD_DETAILS',
        freeField,
    };
};
export const deleteFreeField = id => {
    return {
        type: 'DELETE_FREE_FIELD',
        id,
    };
};
