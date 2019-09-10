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

    return (
        <PortalUserContext.Provider
            value={{
                user: user,
                updateUser: updateUser,
                currentSelectedContact,
                setCurrentContact,
            }}
        >
            {props.children}
        </PortalUserContext.Provider>
    );
};

const PortalUserConsumer = PortalUserContext.Consumer;

export { PortalUserProvider, PortalUserConsumer };
