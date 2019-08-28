import React, { useState } from 'react';
import AuthAPI from '../api/auth/AuthAPI';

const AuthContext = React.createContext();

const localStorageKey = '__customer-portal-econobis__';

const AuthProvider = function(props) {
    const [isAuth, setAuth] = useState(checkIfAuth());

    function login(payload, cbRedirect) {
        setAuth(true);
        const token = payload.access_token;
        window.localStorage.setItem(localStorageKey, token);
        cbRedirect();
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
