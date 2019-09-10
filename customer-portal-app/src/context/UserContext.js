import React, { createContext, useState } from 'react';

const UserContext = createContext({
    user: {},
    updateUser: () => {},
});

const UserProvider = function(props) {
    const [user, setUser] = useState({});
    const [inControlContact, setInControlContact] = useState({});

    function updateUser(user) {
        setUser(user);
        updateInControlContact(user);
    }

    function updateInControlContact(contact) {
        setInControlContact(contact);
    }

    return (
        <UserContext.Provider
            value={{
                user: user,
                updateUser: updateUser,
                inControlContact: inControlContact,
                updateInControlContact: updateInControlContact,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
