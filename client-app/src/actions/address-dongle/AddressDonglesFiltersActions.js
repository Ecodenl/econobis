import React from 'react';

export const setFilterAddressDongleFullName = fullName => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_FULL_NAME',
    fullName,
});

export const setFilterAddressDongleAddress = address => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_ADDRESS',
    address,
});

export const setFilterAddressDonglePostalCode = postalCode => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_POSTAL_CODE',
    postalCode,
});

export const setFilterAddressDongleCity = city => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_CITY',
    city,
});

export const setFilterAddressDongleTypeReadOutId = typeReadOutId => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_TYPE_READ_OUT_ID',
    typeReadOutId,
});

export const setFilterAddressDongleDateStartStart = dateStartStart => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_DATE_START_START',
    dateStartStart,
});

export const setFilterAddressDongleDateStartEnd = dateStartEnd => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_DATE_START_END',
    dateStartEnd,
});

export const setFilterAddressDongleDateEndStart = dateEndStart => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_DATE_END_START',
    dateEndStart,
});

export const setFilterAddressDongleDateEndEnd = dateEndEnd => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_DATE_END_END',
    dateEndEnd,
});

export const setFilterAddressDongleTypeDongleId = typeDongleId => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_TYPE_DONGLE_ID',
    typeDongleId,
});

export const setFilterAddressDongleEnergyId = energyId => ({
    type: 'SET_FILTER_ADDRESS_DONGLE_ENERGY_ID',
    energyId,
});

// export const setFilterAddressDongleMacNumber = macNumber => ({
//     type: 'SET_FILTER_ADDRESS_DONGLE_MAC_NUMBER',
//     macNumber,
// });

// export const setFilterAddressDongleDateSignedStart = dateSignedStart => ({
//     type: 'SET_FILTER_ADDRESS_DONGLE_DATE_SIGNED_START',
//     dateSignedStart,
// });

// export const setFilterAddressDongleDateSignedEnd = dateSignedEnd => ({
//     type: 'SET_FILTER_ADDRESS_DONGLE_DATE_SIGNED_END',
//     dateSignedEnd,
// });

export const clearFilterAddressDongles = () => ({
    type: 'CLEAR_FILTER_ADDRESS_DONGLES',
});
