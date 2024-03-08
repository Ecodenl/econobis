import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NewAccountSuccess = () => {
    const [imageHash, setImageHash] = useState(Date.now());

    return (
        <Container fluid className="authorization-container">
            <Row className="justify-content-center align-content-center full-height">
                <Col xs="12" sm="10" md="8" lg="6" xl="4">
                    <img src={`images/logo.png?${imageHash}`} alt="" className="image logo-container" />
                    <div>
                        <h3 className={'authorization-text'}>Een E-mail is onderweg!</h3>
                        <p className={'authorization-text'}>
                            Binnen enkele minuten ontvang je een e-mail met een persoonlijke link. Via deze link kun je
                            je account activeren.
                            <br />
                            <br />
                            <strong>Let op:</strong> Het kan zijn dat de mail door een spamfilter is geblokkeerd.
                            Spamfilters van bijvoorbeeld Gmail en Hotmail staan erg "scherp". Kijk even bij de
                            Spam/Reclame of je onze mail daar terug vindt.
                        </p>
                        <a onClick={window.close} href="#" className="authorization-link">
                            Sluit venster
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NewAccountSuccess;
