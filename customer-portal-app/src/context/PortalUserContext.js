import React, { createContext, useState } from 'react';

const PortalUserContext = createContext({
    user: {},
    updateUser: () => {},
});

const PortalUserProvider = function(props) {
    const [user, setUser] = useState({});
    const [currentSelectedContact, setCurrentContact] = useState({});

    function updateUser(user) {
        setUser(user);
        setCurrentContact(user);
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
                updateUser: updateUser,
                currentSelectedContact,
                setCurrentContact,
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
