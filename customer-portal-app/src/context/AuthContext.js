import React, { useState } from 'react';
import moment from 'moment';

const AuthContext = React.createContext();

const localStorageToken = '__customer-portal-econobis-token__';
const localStorageLastActivity = '__customer-portal-econobis-last-activity__';

const AuthProvider = function(props) {
    const [isAuth, setAuth] = useState(checkIfAuth());

    function login(payload, cbRedirect) {
        const token = payload.access_token;
        window.localStorage.setItem(localStorageToken, token);
        localStorage.setItem(localStorageLastActivity, moment().format());
        setAuth(true);
        cbRedirect();
    }

    function logout() {
        window.localStorage.removeItem(localStorageToken);
        window.localStorage.removeItem(localStorageLastActivity);
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
        return window.localStorage.getItem(localStorageToken);
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
