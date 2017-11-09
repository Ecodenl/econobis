export const fetchContactDetails = (payload) => {
    return {
        type: 'FETCH_CONTACT_DETAILS',
        payload
    }
};

export const deleteContact = (id) => {
    return  {
        type: 'DELETE_CONTACT',
        id,
    };
};

export const updatePerson = (contactDetails) => {
    return {
        type: 'UPDATE_PERSON',
        contactDetails,
    };
};

export const updateAccount = (contactDetails) => {
    return {
        type: 'UPDATE_ACCOUNT',
        contactDetails,
    };
};

export const newAddress = (address) => {
    return {
        type: 'NEW_ADDRESS',
        address,
    };
};

export const updateAddress = (address) => {
    return {
        type: 'UPDATE_ADDRESS',
        address,
    };
};

export const deleteAddress = (id) => {
    return {
        type: 'DELETE_ADDRESS',
        id,
    };
};

export const newPhoneNumber = (phoneNumber) => {
    return {
        type: 'NEW_PHONE_NUMBER',
        phoneNumber,
    };
};

export const updatePhoneNumber = (phoneNumber) => {
    return {
        type: 'UPDATE_PHONE_NUMBER',
        phoneNumber,
    };
};

export const deletePhoneNumber = (id) => {
    return {
        type: 'DELETE_PHONE_NUMBER',
        id,
    };
};

export const newEmailAddress = (emailAddress) => {
    return {
        type: 'NEW_EMAIL_ADDRESS',
        emailAddress,
    };
};

export const updateEmailAddress = (emailAddress) => {
    return {
        type: 'UPDATE_EMAIL_ADDRESS',
        emailAddress,
    };
};

export const deleteEmailAddress = (id) => {
    return {
        type: 'DELETE_EMAIL_ADDRESS',
        id,
    };
};

export const newNote = (note) => {
    return {
        type: 'NEW_NOTE',
        note,
    };
};

export const updateNote = (note) => {
    return {
        type: 'UPDATE_NOTE',
        note,
    };
};

export const deleteNote = (id) => {
    return {
        type: 'DELETE_NOTE',
        id,
    };
};

export const makePrimary = (id) => {
    return {
        type: 'MAKE_PRIMARY',
        id,
    };
};