import React from 'react';
import { AuthConsumer } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default () => (
    <header>
        <AuthConsumer>
            {({ isAuth, login, logout }) => {
                return (
                    <div className="header-deltaw">
                        <div className="profile-pic" />
                        {isAuth ? (
                            <ul>
                                <button onClick={logout}>logout (temp)</button>
                            </ul>
                        ) : null}
                    </div>
                );
            }}
        </AuthConsumer>
    </header>
);
