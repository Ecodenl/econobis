import React from 'react';
import { hashHistory } from 'react-router';

const ErrorPage = () => (
    <div className="loader">
        <h1>Oeps...</h1>
        <h3>...er is helaas iets mis gegaan.</h3>
        <p className={"h4"}>Probeer de pagina <a role="button" onClick={() => {location.reload();}}>opnieuw</a> te laden.</p>
        <p className={"h4"}>Of log <a role="button" onClick={() => {hashHistory.push('loguit');location.reload();}}> opnieuw</a> in.</p>
    </div>
);

export default ErrorPage;