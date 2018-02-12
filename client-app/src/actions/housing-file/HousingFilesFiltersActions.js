export const setHousingFileDateFilter = (createdAt) => ({
    type: 'SET_FILTER_HOUSING_FILE_DATE',
    createdAt,
});

export const setFilterHousingFileAddress = (address) => ({
    type: 'SET_FILTER_HOUSING_FILE_ADDRESS',
    address,
});

export const setFilterFullName = (fullName) => ({
    type: 'SET_FILTER_HOUSING_FILE_FULL_NAME',
    fullName,
});

export const setFilterBuildingType = (buildingTypeId) => ({
    type: 'SET_FILTER_HOUSING_FILE_BUILDING_TYPE',
    buildingTypeId,
});

export const setFilterHousingFileEnergyLabel = (energyLabelId) => ({
    type: 'SET_FILTER_HOUSING_FILE_ENERGY_LABEL',
    energyLabelId,
});

export const clearFilterHousingFiles = () => ({
    type: 'CLEAR_FILTER_HOUSING_FILES',
});