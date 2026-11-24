import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const reloadPage = () => {
        window.location.reload();
    };

    const loginAgain = () => {
        navigate('/loguit');
        window.location.reload();
    };

    return (
        <div className="loader">
            <h1>Oeps...</h1>
            <h3>De applicatiegegevens konden niet worden geladen.</h3>

            <p className="h4">
                Mogelijk is dit een tijdelijke storing. Wacht even en probeer de pagina daarna opnieuw te laden.
            </p>

            <div className="btn-group margin-10-top" role="group">
                <button type="button" className="btn btn-primary" onClick={reloadPage}>
                    Pagina opnieuw laden
                </button>

                <button type="button" className="btn btn-default" onClick={loginAgain}>
                    Opnieuw inloggen
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
