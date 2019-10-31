import React, { useEffect, useState } from 'react';
import LogoImage from '../../../images/logo.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const NewAccountSuccess = () => {
    return (
        <Container fluid className="authorization-container text-light">
            <Row className="justify-content-center align-content-center full-height">
                <Col xs="12" sm="10" md="8" lg="6" xl="4">
                    <img src={LogoImage} alt="" className="image logo-container" />
                    <div>
                        <h3 className={'text-light'}>Een E-mail is onderweg!</h3>
                        <p className={'text-light'}>
                            Binnen enkele minuten ontvang je een e-mail met een persoonlijke link. Via deze link kun je
                            je account activeren.
                        </p>
                        <Link to={'/login'} className="authorization-link">
                            Terug naar inloggen
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NewAccountSuccess;
