import React, { useState } from 'react';

const AuthContext = React.createContext();

const localStorageKey = '__customer-portal-econobis__';

const AuthProvider = function(props) {
    const [isAuth, setAuth] = useState(checkIfAuth());

    function login(redirect) {
        setTimeout(() => {
            setAuth(true);
            const token = 'dummy-token';
            window.localStorage.setItem(localStorageKey, token);
            redirect();
        }, 1000);
    }

    function logout() {
        window.localStorage.removeItem(localStorageKey);
        setAuth(false);
    }

    function checkIfAuth() {
        const token = getToken();
        if (!token) {
            // Redirect to login
            return false;
        }
        return true;
    }

    function getToken() {
        return window.localStorage.getItem(localStorageKey);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth: isAuth,
                login: login,
                logout: logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
