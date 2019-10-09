import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function StepFive() {
    return (
        <div>
            <Row>
                <Col xs={12} md={10}>
                    <p>
                        Bedankt voor je inschrijving! Je ontvangt van ons een e-mail met daarin alle gegevens van je
                        inschrijving en informatie over de vervolgstappen die we nemen om jouw inschrijving definitief
                        te maken.
                    </p>
                    <p>Onder de menuknop “Inschrijvingen” vind je je inschrijving terug.</p>
                    <p>Wil je je inschrijving aanpassen? Neem dan contact met ons op.</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={10}>
                    <ButtonGroup className="float-right">
                        <Link to={`/inschrijvingen-projecten`}>
                            <Button className={'w-button'} size="sm">
                                Naar mijn inschrijvingen
                            </Button>
                        </Link>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default StepFive;
