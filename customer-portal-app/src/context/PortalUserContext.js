import React, { createContext, useState } from 'react';

const localStorageCurrentSelectedContact = '__customer-portal-econobis-current_selected_contact__';

const PortalUserContext = createContext({
    user: {},
    setInitialUserData: () => {},
});

const PortalUserProvider = function(props) {
    const [user, setUser] = useState({});
    const [currentSelectedContact, setCurrentContact] = useState({});

    function setInitialUserData(user) {
        setUser(user);

        const selectedContactId = window.localStorage.getItem(localStorageCurrentSelectedContact);

        // When there is already a selected contact id then lookup the contact
        // Selected contact could be the user or one of the occupations
        if (selectedContactId) {
            if (user.id == selectedContactId) {
                setCurrentContact(user);
            } else {
                const occupationUser = user.occupationsActive.find(
                    occupation => occupation.primaryContact.id == selectedContactId
                );

                setCurrentContact(occupationUser.primaryContact);
            }
        } else {
            // If there is no selected contact then set default the login user as selected contact.
            // Except if the user has an organisation as occupation that is primary
            const organisationUser = user.occupationsActive.find(
                occupation => occupation.primaryContact.typeId === 'organisation' && occupation.primary
            );

            if (organisationUser) {
                setCurrentContact(organisationUser.primaryContact);
                window.localStorage.setItem(localStorageCurrentSelectedContact, organisationUser.primaryContact.id);
            } else {
                setCurrentContact(user);
                window.localStorage.setItem(localStorageCurrentSelectedContact, user.id);
            }
        }
    }

    function switchCurrentContact(contact) {
        setCurrentContact(contact);
        window.localStorage.setItem(localStorageCurrentSelectedContact, contact.id);
    }

    function resetCurrentUserToDefault() {
        setUser({});
        setCurrentContact({});
    }

    function updateNameSelectedContact(fullNameFnf, typeId, firstName, lastNamePrefix, lastName) {
        setCurrentContact({ ...currentSelectedContact, fullNameFnf, typeId, firstName, lastNamePrefix, lastName });

        if (user.id === currentSelectedContact.id) {
            user.fullNameFnf = fullNameFnf;
            user.typeId = typeId;
            user.firstName = firstName;
            user.lastNamePrefix = lastNamePrefix;
            user.lastName = lastName;
        }

        const updatedOccupations = user.occupationsActive.map(occupationContact => {
            if (occupationContact.primaryContact.id === currentSelectedContact.id) {
                occupationContact.primaryContact.fullNameFnf = fullNameFnf;
                occupationContact.primaryContact.typeId = typeId;
                occupationContact.primaryContact.firstName = firstName;
                occupationContact.primaryContact.lastNamePrefix = lastNamePrefix;
                occupationContact.primaryContact.lastName = lastName;
            }
            return occupationContact;
        });

        setUser({ ...user, occupations: updatedOccupations });
    }

    return (
        <PortalUserContext.Provider
            value={{
                user: user,
                setInitialUserData,
                currentSelectedContact,
                switchCurrentContact,
                resetCurrentUserToDefault,
                updateNameSelectedContact,
            }}
        >
            {props.children}
        </PortalUserContext.Provider>
    );
};

const PortalUserConsumer = PortalUserContext.Consumer;

export { PortalUserProvider, PortalUserConsumer, PortalUserContext };
