export const fetchHousingFileDetails = (payload) => {
    return {
        type: 'FETCH_HOUSING_FILE_DETAILS',
        payload
    }
};

export const updateHousingFile = (housingFile) => {
    return {
        type: 'UPDATE_HOUSING_FILE',
        housingFile
    }
};

export const deleteHousingFile = (id) => {
    return {
        type: 'DELETE_HOUSING_FILE',
        id
    }
};

export const newHousingFileMeasureTaken = (address) => {
    return {
        type: 'NEW_HOUSING_FILE_MEASURE_TAKEN',
        address,
    };
};

export const deleteHousingFileMeasureTaken = (addressId, measureId) => {
    return {
        type: 'DELETE_HOUSING_FILE_MEASURE_TAKEN',
        addressId, measureId,
    };
};
