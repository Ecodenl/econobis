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

    return (
        <PortalUserContext.Provider
            value={{
                user: user,
                updateUser: updateUser,
                currentSelectedContact,
                setCurrentContact,
                resetCurrentUserToDefault,
            }}
        >
            {props.children}
        </PortalUserContext.Provider>
    );
};

const PortalUserConsumer = PortalUserContext.Consumer;

export { PortalUserProvider, PortalUserConsumer };
