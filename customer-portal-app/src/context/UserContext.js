import React, { createContext, useState } from 'react';

const UserContext = createContext({
    user: {},
    updateUser: () => {},
});

const UserProvider = function(props) {
    const [user, setUser] = useState({});

    function updateUser(user) {
        setUser(user);
    }

    return (
        <UserContext.Provider
            value={{
                user: user,
                updateUser: updateUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
