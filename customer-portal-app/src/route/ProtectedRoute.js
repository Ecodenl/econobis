import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthContext';
import Header from '../container/Header';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <AuthConsumer>
        {({ isAuth }) => (
            <div className="body-2" id="body-2">
                <Header />
                <Route render={props => (isAuth ? <Component {...props} /> : <Redirect to="/login" />)} {...rest} />
            </div>
        )}
    </AuthConsumer>
);

export default ProtectedRoute;
