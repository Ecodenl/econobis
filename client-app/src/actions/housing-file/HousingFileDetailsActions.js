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

export const newHousingFileMeasureTaken = (housingFileId, measureId) => {
    return {
        type: 'NEW_HOUSING_FILE_MEASURE_REQUESTED',
        housingFileId, measureId,
    };
};

export const deleteHousingFileMeasureTaken = (housingFileId, measureId) => {
    return {
        type: 'DELETE_HOUSING_FILE_MEASURE_REQUESTED',
        housingFileId, measureId,
    };
};
