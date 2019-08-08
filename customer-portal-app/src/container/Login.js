import React, { useState } from 'react';
import { AuthConsumer } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

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
                    <div>
                        <h3>Login pagina {from.pathname}</h3>
                        <button onClick={() => handleSubmit(login)}>login</button>
                    </div>
                )}
                </AuthConsumer>
            )}
        </>
    );
};
