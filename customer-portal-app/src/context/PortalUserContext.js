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
                const occupationUser = user.occupations.find(
                    occupation => occupation.primaryContact.id == selectedContactId
                );

                setCurrentContact(occupationUser.primaryContact);
            }
        } else {
            // If there is no selected contact then set default the login user as selected contact.
            // Except if the user has an organisation as occupation
            const organisationUser = user.occupations.find(
                occupation => occupation.primaryContact.typeId === 'organisation'
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

    function updateNameSelectedContact(fullName) {
        setCurrentContact({ ...currentSelectedContact, fullName });

        if (user.id === currentSelectedContact.id) {
            user.fullName = fullName;
        }

        const updatedOccupations = user.occupations.map(occupationContact => {
            if (occupationContact.primaryContact.id === currentSelectedContact.id) {
                occupationContact.primaryContact.fullName = fullName;
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

export { PortalUserProvider, PortalUserConsumer };
