import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Form } from 'formik';

function StepFive({ contactProjectData }) {
    return (
        <div>
            <Row>
                <Col xs={12} md={10}>
                    {contactProjectData.textRegistrationFinishedMerged.split('\n').map((item, key) => {
                        return (
                            <span key={key}>
                                {item}
                                <br />
                            </span>
                        );
                    })}
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
