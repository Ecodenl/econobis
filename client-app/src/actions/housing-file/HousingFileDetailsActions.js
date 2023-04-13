export const fetchHousingFileDetails = payload => {
    return {
        type: 'FETCH_HOUSING_FILE_DETAILS',
        payload,
    };
};

export const updateHousingFile = housingFile => {
    return {
        type: 'UPDATE_HOUSING_FILE',
        housingFile,
    };
};

export const updateHousingFileUse = housingFile => {
    return {
        type: 'UPDATE_HOUSING_FILE_USE',
        housingFile,
    };
};

export const deleteHousingFile = id => {
    return {
        type: 'DELETE_HOUSING_FILE',
        id,
    };
};

export const addHousingFileSpecificationToState = housingFileSpecification => {
    return {
        type: 'ADD_HOUSING_FILE_SPECIFICATION',
        housingFileSpecification,
    };
};

export const updateHousingFileSpecificationToState = housingFileSpecification => {
    return {
        type: 'UPDATE_HOUSING_FILE_SPECIFICATION',
        housingFileSpecification,
    };
};

export const deleteHousingFileSpecification = housingFileSpecificationId => {
    return {
        type: 'DELETE_HOUSING_FILE_SPECIFICATION',
        housingFileSpecificationId,
    };
};

export const addHousingFileHousingStatusToState = housingFileHousingStatus => {
    return {
        type: 'ADD_HOUSING_FILE_HOUSING_STATUS',
        housingFileHousingStatus,
    };
};

export const updateHousingFileHousingStatusToState = housingFileHousingStatus => {
    return {
        type: 'UPDATE_HOUSING_FILE_HOUSING_STATUS',
        housingFileHousingStatus,
    };
};

export const deleteHousingFileHousingStatus = housingFileHousingStatusId => {
    return {
        type: 'DELETE_HOUSING_FILE_HOUSING_STATUS',
        housingFileHousingStatusId,
    };
};
