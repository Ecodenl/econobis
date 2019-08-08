import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../../context/AuthContext';
import LogoImage from '../../images/logo.png';
import LoginForm from './Form';

export default props => {
    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = props.location.state || { from: { pathname: '/dashboard' } };

    function handleSubmit(values, actions, login) {
        // TODO Call api and then handle submit functions
        login(() => toggleRedirect(true));

        // If login fails then set submitting back to false
        // actions.setSubmitting(false);
    }

    function redirect() {
        return <Redirect to={from} />;
    }

    return (
        <>
            {redirectToReferrer ? (
                redirect()
            ) : (
                <AuthConsumer>
                    {({ isAuth, login }) => (
                        <div className="body full-page-section">
                            <div className="div-block">
                                <div className="div-block">
                                    <div className="div-block">
                                        <img src={LogoImage} alt="" className="image" />
                                        <LoginForm handleSubmit={handleSubmit} login={login} />
                                        <a href="wachtwoord-vergeten.html" className="link">
                                            wachtwoord vergeten?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </AuthConsumer>
            )}
        </>
    );
};
