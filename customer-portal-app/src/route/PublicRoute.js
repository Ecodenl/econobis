import React, { useContext, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { ThemeSettingsContext } from '../context/ThemeSettingsContext';

const PublicRoute = ({ component: Component, ...rest }) => {
    const location = useLocation();
    const { switchToDefaultThemeSettings } = useContext(ThemeSettingsContext);

    useEffect(() => {
        switchToDefaultThemeSettings();
    }, [location.pathname]);

    return <Route render={props => <Component {...props} />} {...rest} />;
};

export default PublicRoute;
