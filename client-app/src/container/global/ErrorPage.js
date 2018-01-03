import React from 'react';

const ErrorPage = () => (
    <div className="loader">
        <h1>Oeps...</h1>
        <h4>...er is helaas iets mis gegaan. Probeer de pagina <a role="button" onClick={() => {location.reload();}}>opnieuw</a> te laden.</h4>
    </div>
);

export default ErrorPage;