export const fetchContactDetails = payload => {
    return {
        type: 'FETCH_CONTACT_DETAILS',
        payload,
    };
};

export const deleteContact = id => {
    return {
        type: 'DELETE_CONTACT',
        id,
    };
};

export const updatePerson = contactDetails => {
    return {
        type: 'UPDATE_PERSON',
        contactDetails,
    };
};

export const updateOrganisation = contactDetails => {
    return {
        type: 'UPDATE_ORGANISATION',
        contactDetails,
    };
};

export const updatePortalUser = portalUser => {
    return {
        type: 'UPDATE_PORTAL_USER',
        portalUser,
    };
};

export const deletePortalUser = id => {
    return {
        type: 'DELETE_PORTAL_USER',
        id,
    };
};

export const newAddress = address => {
    return {
        type: 'NEW_ADDRESS',
        address,
    };
};

export const updateAddress = address => {
    return {
        type: 'UPDATE_ADDRESS',
        address,
    };
};

export const deleteAddress = id => {
    return {
        type: 'DELETE_ADDRESS',
        id,
    };
};

export const newPhoneNumber = phoneNumber => {
    return {
        type: 'NEW_PHONE_NUMBER',
        phoneNumber,
    };
};

export const updatePhoneNumber = phoneNumber => {
    return {
        type: 'UPDATE_PHONE_NUMBER',
        phoneNumber,
    };
};

export const deletePhoneNumber = id => {
    return {
        type: 'DELETE_PHONE_NUMBER',
        id,
    };
};

export const newEmailAddress = emailAddress => {
    return {
        type: 'NEW_EMAIL_ADDRESS',
        emailAddress,
    };
};

export const updateEmailAddress = emailAddress => {
    return {
        type: 'UPDATE_EMAIL_ADDRESS',
        emailAddress,
    };
};

export const deleteEmailAddress = id => {
    return {
        type: 'DELETE_EMAIL_ADDRESS',
        id,
    };
};

export const newNote = note => {
    return {
        type: 'NEW_CONTACT_NOTE',
        note,
    };
};

export const updateNote = note => {
    return {
        type: 'UPDATE_CONTACT_NOTE',
        note,
    };
};

export const deleteNote = id => {
    return {
        type: 'DELETE_CONTACT_NOTE',
        id,
    };
};

export const makePrimary = id => {
    return {
        type: 'MAKE_PRIMARY',
        id,
    };
};

export const unsetPrimaryAddresses = () => {
    return {
        type: 'UNSET_PRIMARY_ADDRESSES',
    };
};

export const unsetPrimaryPhoneNumbers = () => {
    return {
        type: 'UNSET_PRIMARY_PHONE_NUMBERS',
    };
};

export const unsetPrimaryEmailAddresses = () => {
    return {
        type: 'UNSET_PRIMARY_EMAIL_ADDRESSES',
    };
};

export const newStateAddressEnergySupplier = addressEnergySupplier => {
    return {
        type: 'NEW_ADDRESS_ENERGY_SUPPLIER',
        addressEnergySupplier,
    };
};

export const newStateAddressDongle = addressDongle => {
    return {
        type: 'NEW_ADDRESS_DONGLE',
        addressDongle,
    };
};

export const updateStateAddressEnergySupplier = addressEnergySupplier => {
    return {
        type: 'UPDATE_ADDRESS_ENERGY_SUPPLIER',
        addressEnergySupplier,
    };
};

export const deleteAddressEnergySupplier = id => {
    return {
        type: 'DELETE_ADDRESS_ENERGY_SUPPLIER',
        id,
    };
};

export const deleteAddressDongle = id => {
    return {
        type: 'DELETE_ADDRESS_DONGLE',
        id,
    };
};

export const updateContactHoomAccount = hoomAccountId => {
    return {
        type: 'UPDATE_HOOM_ACCOUNT_ID',
        hoomAccountId,
    };
};
