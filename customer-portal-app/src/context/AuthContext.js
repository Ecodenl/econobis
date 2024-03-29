import React, { useState } from 'react';
import moment from 'moment';

const AuthContext = React.createContext();

const localStorageToken = '__customer-portal-econobis-token__';
const localStorageLastActivity = '__customer-portal-econobis-last-activity__';
const localStorageCurrentSelectedContact = '__customer-portal-econobis-current_selected_contact__';

const AuthProvider = function(props) {
    const [isAuth, setAuth] = useState(checkIfAuth());

    function login(payload, cbRedirect) {
        const token = payload.access_token;
        window.localStorage.removeItem(localStorageCurrentSelectedContact);
        window.localStorage.setItem(localStorageToken, token);
        localStorage.setItem(localStorageLastActivity, moment().format());
        setAuth(true);
        cbRedirect();
    }

    function logout(force = false) {
        window.localStorage.removeItem(localStorageToken);
        window.localStorage.removeItem(localStorageLastActivity);

        /**
         * De "force" parameter wordt meegegeven bij handmatig uitloggen door gebruiker.
         * Op dat moment willen we ook dat bij volgende keer inloggen de twee factor code opnieuw moet worden ingevoerd.
         * Als gebruiker wordt uitgelogd doordat de sessie is verlopen komt de code hier ook langs maar willen we niet dat de two factor code opnieuw moet worden ingevoerd bij volgende login.
         */
        if(force) {
            window.localStorage.removeItem('portal_two_factor_token');
        }

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
