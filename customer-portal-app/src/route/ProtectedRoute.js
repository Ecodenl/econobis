import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthContext';
import Header from '../components/layout/Header';
import PortalUserAPI from '../api/portal-user/PortalUserAPI';
import { PortalUserConsumer } from '../context/PortalUserContext';

const ProtectedRoute = ({ component: Component, updateUser, isAuth, ...rest }) => {
    useEffect(() => {
        if (isAuth) {
            (function callFetchPortalUserDetails() {
                PortalUserAPI.fetchPortalUserDetails()
                    .then(payload => {
                        updateUser(payload.data.data);
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    });
            })();
        }
    }, [isAuth]);

    return (
        <AuthConsumer>
            {({ isAuth }) => (
                <div className="body-2" id="body-2">
                    <Header />
                    <Route render={props => (isAuth ? <Component {...props} /> : <Redirect to="/login" />)} {...rest} />
                </div>
            )}
        </AuthConsumer>
    );
};

export default function ProtectedRouteWithContext(props) {
    return (
        <AuthConsumer>
            {({ isAuth }) => (
                <PortalUserConsumer>
                    {({ updateUser }) => <ProtectedRoute {...props} updateUser={updateUser} isAuth={isAuth} />}
                </PortalUserConsumer>
            )}
        </AuthConsumer>
    );
}
