import React, { useState } from 'react';
import moment from 'moment';

const AuthContext = React.createContext();

const localStorageToken = '__customer-portal-econobis-token__';
const localStorageRefreshToken = 'refresh_token';
const localStorageLastActivity = '__customer-portal-econobis-last-activity__';
const localStorageCurrentSelectedContact = '__customer-portal-econobis-current_selected_contact__';
const localStorageTwoFactorToken = 'portal_two_factor_token';

const AuthProvider = function(props) {
    const [isAuth, setAuth] = useState(checkIfAuth());

    function login(payload, cbRedirect) {
        const token = payload.access_token;
        const refreshToken = payload.refresh_token;

        window.localStorage.removeItem(localStorageCurrentSelectedContact);
        window.localStorage.setItem(localStorageToken, token);
        window.localStorage.setItem(localStorageRefreshToken, refreshToken);
        window.localStorage.setItem(localStorageLastActivity, moment().format());

        setAuth(true);
        cbRedirect();
    }

    function logout(force = false) {
        window.localStorage.removeItem(localStorageToken);
        window.localStorage.removeItem(localStorageRefreshToken);
        window.localStorage.removeItem(localStorageLastActivity);
        window.localStorage.removeItem(localStorageCurrentSelectedContact);

        if (force) {
            window.localStorage.removeItem(localStorageTwoFactorToken);
        }

        setAuth(false);
    }

    function checkIfAuth() {
        const token = getToken();
        // if (!token) {
        //     // Redirect to login
        //     return false;
        // }
        // return true;
        return !!token;
    }

    function getToken() {
        return window.localStorage.getItem(localStorageToken);
    }

    function getRefreshToken() {
        return window.localStorage.getItem(localStorageRefreshToken);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                login,
                logout,
                getToken,
                getRefreshToken,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
