/* eslint-disable indent */
export default function(state = {}, action) {
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
        case 'UPDATE_ORGANISATION':
            return {
                ...state,
                ...action.contactDetails,
            };
        case 'UPDATE_PORTAL_USER':
            return {
                ...state,
                portalUser: {
                    ...state.portalUser,
                    ...action.portalUser,
                },
            };
        case 'DELETE_PORTAL_USER_SUCCESS':
            return {
                ...state,
                portalUser: null,
            };
        case 'NEW_ADDRESS':
            return {
                ...state,
                addresses: [
                    ...state.addresses,
                    {
                        ...action.address,
                    },
                ],
            };
        case 'UPDATE_ADDRESS':
            return {
                ...state,
                addresses: state.addresses.map(address =>
                    address.id === action.address.id
                        ? {
                              ...action.address,
                          }
                        : address
                ),
            };
        case 'DELETE_ADDRESS_SUCCESS':
            return {
                ...state,
                addresses: state.addresses.filter(address => address.id !== action.id),
            };
        case 'NEW_PHONE_NUMBER':
            return {
                ...state,
                phoneNumbers: [
                    ...state.phoneNumbers,
                    {
                        ...action.phoneNumber,
                    },
                ],
            };
        case 'UPDATE_PHONE_NUMBER':
            return {
                ...state,
                phoneNumbers: state.phoneNumbers.map(phoneNumber =>
                    phoneNumber.id === action.phoneNumber.id
                        ? {
                              ...action.phoneNumber,
                          }
                        : phoneNumber
                ),
            };
        case 'DELETE_PHONE_NUMBER_SUCCESS':
            return {
                ...state,
                phoneNumbers: state.phoneNumbers.filter(phoneNumber => phoneNumber.id !== action.id),
            };
        case 'NEW_EMAIL_ADDRESS':
            return {
                ...state,
                emailAddresses: [
                    ...state.emailAddresses,
                    {
                        ...action.emailAddress,
                    },
                ],
            };
        case 'UPDATE_EMAIL_ADDRESS':
            return {
                ...state,
                emailAddresses: state.emailAddresses.map(emailAddress =>
                    emailAddress.id === action.emailAddress.id
                        ? {
                              ...action.emailAddress,
                          }
                        : emailAddress
                ),
            };
        case 'DELETE_EMAIL_ADDRESS_SUCCESS':
            return {
                ...state,
                emailAddresses: state.emailAddresses.filter(emailAddress => emailAddress.id !== action.id),
            };
        case 'NEW_CONTACT_NOTE':
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        ...action.note,
                    },
                ],
            };
        case 'UPDATE_CONTACT_NOTE':
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.note.id
                        ? {
                              ...note,
                              note: action.note.note,
                          }
                        : note
                ),
            };
        case 'DELETE_CONTACT_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id),
            };
        case 'UNSET_PRIMARY_ADDRESSES':
            return {
                ...state,
                addresses: state.addresses.map(address => {
                    return {
                        ...address,
                        primary: false,
                    };
                }),
            };
        case 'UNSET_PRIMARY_PHONE_NUMBERS':
            return {
                ...state,
                phoneNumbers: state.phoneNumbers.map(phoneNumber => {
                    return {
                        ...phoneNumber,
                        primary: false,
                    };
                }),
            };
        case 'UNSET_PRIMARY_EMAIL_ADDRESSES':
            return {
                ...state,
                emailAddresses: state.emailAddresses.map(emailAddress => {
                    return {
                        ...emailAddress,
                        primary: false,
                    };
                }),
            };
        case 'NEW_ADDRESS_ENERGY_SUPPLIER':
            return {
                ...state,
                addresses: state.addresses.map(address =>
                    address.id === action.addressEnergySupplier.addressId
                        ? {
                              ...address,
                              addressEnergySuppliers: [
                                  ...address.addressEnergySuppliers,
                                  {
                                      ...action.addressEnergySupplier,
                                  },
                              ],
                          }
                        : address
                ),
            };

        case 'UPDATE_ADDRESS_ENERGY_SUPPLIER':
            return {
                ...state,
                addresses: state.addresses.map(address =>
                    address.id === action.addressEnergySupplier.addressId
                        ? {
                              ...address,
                              addressEnergySuppliers: address.addressEnergySuppliers.map(addressEnergySupplier =>
                                  addressEnergySupplier.id === action.addressEnergySupplier.id
                                      ? {
                                            ...action.addressEnergySupplier,
                                        }
                                      : addressEnergySupplier
                              ),
                          }
                        : address
                ),
            };

        case 'DELETE_ADDRESS_ENERGY_SUPPLIER':
            return {
                ...state,
                addresses: state.addresses.map(address => {
                    return {
                        ...address,
                        addressEnergySuppliers: address.addressEnergySuppliers.filter(
                            addressEnergySupplier => addressEnergySupplier.id !== action.id
                        ),
                    };
                }),
            };

        case 'NEW_ADDRESS_DONGLE':
            return {
                ...state,
                addresses: state.addresses.map(address =>
                    address.id === action.addressDongle.addressId
                        ? {
                              ...address,
                              addressDongles: [
                                  ...address.addressDongles,
                                  {
                                      ...action.addressDongle,
                                  },
                              ],
                          }
                        : address
                ),
            };

        case 'UPDATE_ADDRESS_DONGLE':
            return {
                ...state,
                addresses: state.addresses.map(address =>
                    address.id === action.addressDongle.addressId
                        ? {
                              ...address,
                              addressDongles: address.addressDongles.map(addressDongle =>
                                  addressDongle.id === action.addressDongle.id
                                      ? {
                                            ...action.addressDongle,
                                        }
                                      : addressDongle
                              ),
                          }
                        : address
                ),
            };

        case 'DELETE_ADDRESS_DONGLE':
            return {
                ...state,
                addresses: state.addresses.map(address => {
                    return {
                        ...address,
                        addressDongles: address.addressDongles.filter(addressDongle => addressDongle.id !== action.id),
                    };
                }),
            };

        case 'UPDATE_HOOM_ACCOUNT_ID':
            return { ...state, hoomAccountId: action.hoomAccountId };
        default:
            return state;
    }
}
