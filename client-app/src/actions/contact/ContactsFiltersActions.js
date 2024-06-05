// SET_CONTACTNR_FILTER
export const setNumberFilter = number => ({
    type: 'SET_NUMBER_FILTER',
    number,
});

// SET_TYPE_FILTER
export const setTypeFilter = typeId => ({
    type: 'SET_TYPE_FILTER',
    typeId,
});

// SET_FULLNAME_FILTER
export const setFullNameFilter = fullName => ({
    type: 'SET_FULL_NAME_FILTER',
    fullName,
});

// SET_STREET_AND_NUMBER_FILTER
export const setStreetAndNumberFilter = streetAndNumber => ({
    type: 'SET_STREET_AND_NUMBER_FILTER',
    streetAndNumber,
});

// SET_POSTCODE_FILTER
export const setPostalCodeFilter = postalCode => ({
    type: 'SET_POSTAL_CODE_FILTER',
    postalCode,
});

// SET_CITY_FILTER
export const setCityFilter = city => ({
    type: 'SET_CITY_FILTER',
    city,
});

// SET_EMAIL_FILTER
export const setEmailAddressFilter = emailAddress => ({
    type: 'SET_EMAIL_ADDRESS_FILTER',
    emailAddress,
});

// SET_PHONENUMBER_FILTER
export const setPhoneNumberFilter = phoneNumber => ({
    type: 'SET_PHONE_NUMBER_FILTER',
    phoneNumber,
});

// SET_IBAN_FILTER
export const setIbanFilter = iban => ({
    type: 'SET_IBAN_FILTER',
    iban,
});

// SET_STATUS_FILTER
export const setStatusFilter = statusId => ({
    type: 'SET_STATUS_FILTER',
    statusId,
});

// SET_CREATED_AT_FILTER
export const setCreatedAtFilter = createdAt => ({
    type: 'SET_CREATED_AT_FILTER',
    createdAt,
});

export const clearFilterContacts = () => ({
    type: 'CLEAR_FILTER_CONTACTS',
});
