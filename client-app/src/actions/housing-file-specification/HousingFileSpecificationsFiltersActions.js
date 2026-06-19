import React from 'react';

export const setFilterHousingFileSpecificationFullName = fullName => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_FULL_NAME',
    fullName,
});

export const setFilterHousingFileSpecificationAddress = address => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_ADDRESS',
    address,
});

export const setFilterHousingFileSpecificationPostalCode = postalCode => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_POSTAL_CODE',
    postalCode,
});

export const setFilterHousingFileSpecificationCity = city => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CITY',
    city,
});

export const setFilterHousingFileSpecificationMeasureCategoryName = measureCategoryName => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_CATEGORY_NAME',
    measureCategoryName,
});

export const setFilterHousingFileSpecificationMeasureName = measureName => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_NAME',
    measureName,
});

export const setFilterHousingFileSpecificationStatus = statusId => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_STATUS',
    statusId,
});

export const setFilterHousingFileSpecificationMeasureDateStart = measureDateStart => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_DATE_START',
    measureDateStart,
});

export const setFilterHousingFileSpecificationMeasureDateEnd = measureDateEnd => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_DATE_END',
    measureDateEnd,
});

export const setFilterHousingFileSpecificationCreatedAtStart = createdAtStart => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CREATED_AT_START',
    createdAtStart,
});

export const setFilterHousingFileSpecificationCreatedAtEnd = createdAtEnd => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CREATED_AT_END',
    createdAtEnd,
});

export const setFilterHousingFileSpecificationAnswer = answer => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_ANSWER',
    answer,
});

export const setFilterHousingFileSpecificationFloor = floorId => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_FLOOR',
    floorId,
});

export const setFilterHousingFileSpecificationSide = sideId => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SIDE',
    sideId,
});

export const setFilterHousingFileSpecificationTypeBrand = typeBrand => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_TYPE_BRAND',
    typeBrand,
});

export const setFilterHousingFileSpecificationTypeOfExecution = typeOfExecutionId => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_TYPE_OF_EXECUTION',
    typeOfExecutionId,
});

export const setFilterHousingFileSpecificationSavingsGasFrom = savingsGasFrom => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SAVINGS_GAS_FROM',
    savingsGasFrom,
});
export const setFilterHousingFileSpecificationSavingsGasTill = savingsGasTill => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SAVINGS_GAS_TILL',
    savingsGasTill,
});

export const setFilterHousingFileSpecificationSavingsElectricityFrom = savingsElectricityFrom => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SAVINGS_ELECTRICITY_FROM',
    savingsElectricityFrom,
});
export const setFilterHousingFileSpecificationSavingsElectricityTill = savingsElectricityTill => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_SAVINGS_ELECTRICITY_TILL',
    savingsElectricityTill,
});

export const setFilterHousingFileSpecificationCo2SavingsFrom = co2SavingsFrom => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CO2_SAVINGS_FROM',
    co2SavingsFrom,
});
export const setFilterHousingFileSpecificationCo2SavingsTill = co2SavingsTill => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_CO2_SAVINGS_TILL',
    co2SavingsTill,
});

export const clearFilterHousingFileSpecifications = () => ({
    type: 'CLEAR_FILTER_HOUSING_FILE_SPECIFICATIONS',
});
