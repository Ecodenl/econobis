import React, { useEffect, useContext } from 'react';
import { Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthContext';
import Header from '../components/layout/Header';
import PortalUserAPI from '../api/portal-user/PortalUserAPI';
import { PortalUserConsumer } from '../context/PortalUserContext';
import { ThemeSettingsContext } from '../context/ThemeSettingsContext';
import route from 'react-router-dom/es/Route';

const ProtectedRoute = ({ component: Component, setInitialUserData, isAuth, ...rest }) => {
    const location = useLocation();
    const history = useHistory();
    const { setInitialThemeSettings, switchToDefaultThemeSettings } = useContext(ThemeSettingsContext);

    useEffect(() => {
        if (isAuth) {
            (function callFetchPortalUserDetails() {
                PortalUserAPI.fetchPortalUserDetails()
                    .then(payload => {
                        setInitialUserData(payload.data.data);
                        setInitialThemeSettings(payload.data.data.portalSettingsLayoutAssigned);
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 401) {
                            if (error.response.data.code === 'two_factor_token_invalid') {
                                history.push('/two-factor/confirm');
                            } else {
                                history.push('/login');
                            }
                            return;
                        }
                        alert(
                            'Er is iets misgegaan met laden. Herlaad de pagina opnieuw of probeer opnieuw in te loggen.'
                        );
                        return;
                    });
            })();
        }
    }, [isAuth]);

    useEffect(() => {
        if (isAuth) {
            if (
                !location.pathname.includes('/vrije-velden/') &&
                !location.pathname.includes('/project/') &&
                !location.pathname.includes('/project-deelname/') &&
                !location.pathname.includes('/inschrijven/') &&
                !location.pathname.includes('/dashboard/')
            ) {
                switchToDefaultThemeSettings();
            }
        }
    }, [location.pathname]);

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
                    {({ setInitialUserData }) => (
                        <ProtectedRoute {...props} setInitialUserData={setInitialUserData} isAuth={isAuth} />
                    )}
                </PortalUserConsumer>
            )}
        </AuthConsumer>
    );
}
