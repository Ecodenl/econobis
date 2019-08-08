import React, { useState } from 'react';
import { AuthConsumer } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import LogoImage from '../images/logo.png';

export default props => {
    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = props.location.state || { from: { pathname: '/dashboard' } };

    function handleSubmit(login) {
        login(() => toggleRedirect(true));
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
                                        <input
                                            type="email"
                                            className="text-input w-input"
                                            maxLength="256"
                                            name="email"
                                            data-name="email"
                                            placeholder="email"
                                            id="email"
                                            required=""
                                        />
                                        <input
                                            type="password"
                                            className="text-input w-input"
                                            maxLength="256"
                                            name="field-2"
                                            data-name="Field 2"
                                            placeholder="password"
                                            data-w-id="f80ddecf-a580-211b-282c-8bcfd6b2cf5a"
                                            id="password"
                                            required=""
                                        />
                                        <a
                                            data-w-id="dbc206b6-3b28-b043-fd58-c1651ac413f5"
                                            href="#"
                                            className="login-button w-button"
                                            onClick={() => handleSubmit(login)}
                                        >
                                            Log in
                                        </a>
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
