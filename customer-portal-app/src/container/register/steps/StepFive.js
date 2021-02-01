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
                        Bedankt voor je inschrijving. Per e-mail sturen wij een bevestiging van je inschrijving met
                        informatie over de vervolgstappen.
                        <br />
                        Het kan zijn dat de mail door een spamfilter is geblokkeerd. Spamfilters van bijvoorbeeld Gmail
                        en Hotmail staan erg "scherp". Kijk even bij de Spam/Reclame of je onze mail daar terug vindt.
                    </p>
                    <p>Onder de menuknop “Huidige deelnames” vind je je inschrijving terug.</p>
                    <p>Wil je je inschrijving aanpassen? Neem dan contact met ons op.</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={10}>
                    <ButtonGroup className="float-right">
                        <Link to={`/inschrijvingen-projecten`}>
                            <Button className={'w-button'} size="sm">
                                Naar mijn huidige deelnames
                            </Button>
                        </Link>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default StepFive;
