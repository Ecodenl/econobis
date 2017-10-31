/* eslint-disable indent */
export default function (state = {}, action) {
    switch (action.type) {
        case 'FETCH_CONTACT_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.contactDetails,
            };
        case 'UPDATE_PERSON':
            return {
                ...state,
                ...action.contactDetails,
            };
        case 'UPDATE_ACCOUNT':
            return {
                ...state,
                id: action.contactDetails.id,
                account: {
                    name: action.contactDetails.account.name,
                },
            };
        case 'NEW_ADDRESS':
            return {
                ...state,
                addresses: [
                    ...state.addresses,
                    {
                        id: action.address.id,
                        street: action.address.street,
                        number: action.address.number,
                        postalCode: action.address.postalCode,
                        city: action.address.city,
                        type: action.address.type,
                        primary: action.address.primary,
                    }
                ]
            };
        case 'UPDATE_ADDRESS':
            return {
                ...state,
                addresses: state.addresses.map((address) =>
                    address.id === action.address.id ?
                        {
                            ...address,
                            street: action.address.street,
                            number: action.address.number,
                            postalCode: action.address.postalCode,
                            city: action.address.city,
                            type: action.address.type,
                            primary: action.address.primary,
                        }
                        :
                        address
                )
            };
        case 'DELETE_ADDRESS_SUCCESS':
            return {
                ...state,
                addresses: state.addresses.filter((address) => address.id !== action.id),
            };
        case 'NEW_PHONE_NUMBER':
            return {
                ...state,
                phoneNumbers: [
                    ...state.phoneNumbers,
                    {
                        id: action.phoneNumber.id,
                        contactId: action.phoneNumber.contactId,
                        number: action.phoneNumber.number,
                        type: action.phoneNumber.type,
                        primary: action.phoneNumber.primary,
                    }
                ]
            };
        case 'UPDATE_PHONE_NUMBER':
            return {
                ...state,
                phoneNumbers: state.phoneNumbers.map((phoneNumber) =>
                    phoneNumber.id === action.phoneNumber.id ?
                        {
                            ...phoneNumber,
                            number: action.phoneNumber.number,
                            type: action.phoneNumber.type,
                            primary: action.phoneNumber.primary,
                        }
                        :
                        phoneNumber
                )
            };
        case 'DELETE_PHONE_NUMBER_SUCCESS':
            return {
                ...state,
                phoneNumbers: state.phoneNumbers.filter((phoneNumber) => phoneNumber.id !== action.id),
            };
        case 'NEW_EMAIL_ADDRESS':
            return {
                ...state,
                emailAddresses: [
                    ...state.emailAddresses,
                    {
                        id: action.emailAddress.id,
                        contactId: action.emailAddress.contactId,
                        email: action.emailAddress.email,
                        type: action.emailAddress.type,
                        primary: action.emailAddress.primary,
                    }
                ]
            };
        case 'UPDATE_EMAIL_ADDRESS':
            return {
                ...state,
                emailAddresses: state.emailAddresses.map((emailAddress) =>
                    emailAddress.id === action.emailAddress.id ?
                        {...emailAddress,
                            email: action.emailAddress.email,
                            type: action.emailAddress.type,
                            primary: action.emailAddress.primary,
                        }
                        :
                        emailAddress
                )
            };
        case 'DELETE_EMAIL_ADDRESS_SUCCESS':
            return {
                ...state,
                emailAddresses: state.emailAddresses.filter(emailAddress => emailAddress.id !== action.id),
            };
        case 'NEW_NOTE':
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        ...action.note,
                    }
                ]
            };
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.note.id ?
                        {
                            ...note,
                            note: action.note.note,
                        }
                        :
                        note,
                )
            };
        case 'DELETE_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id),
            };
        default:
            return state;
    }
}
