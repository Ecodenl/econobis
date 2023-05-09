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

export const setFilterHousingFileSpecificationStatusName = statusName => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_STATUS_NAME',
    statusName,
});

export const setFilterHousingFileSpecificationMeasureDateStart = measureDateStart => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_DATE_START',
    measureDateStart,
});

export const setFilterHousingFileSpecificationMeasureDateEnd = measureDateEnd => ({
    type: 'SET_FILTER_HOUSING_FILE_SPECIFICATION_MEASURE_DATE_END',
    measureDateEnd,
});

export const clearFilterHousingFileSpecifications = () => ({
    type: 'CLEAR_FILTER_HOUSING_FILE_SPECIFICATIONS',
});
