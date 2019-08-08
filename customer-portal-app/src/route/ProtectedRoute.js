import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthContext';
import Header from '../container/Header';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <AuthConsumer>

        {({ isAuth }) => (
            <>
            <Header />
            <Route render={props => (isAuth ? <Component {...props} /> : <Redirect to="/login" />)} {...rest} />
            </>
        )}
    </AuthConsumer>
);

export default ProtectedRoute;
