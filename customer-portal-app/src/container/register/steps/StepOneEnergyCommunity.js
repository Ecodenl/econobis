import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

function StepOneEnergyCommunity({ next, project, initialRegisterValues, handleSubmitRegisterValues }) {
    return (
        <Formik
            initialValues={initialRegisterValues}
            enableReinitialize={true}
            onSubmit={values => {
                handleSubmitRegisterValues({
                    ...values,
                    participationsOptioned: 1,
                    amount: 0,
                    amountOptioned: 0,
                    transactionCostsAmount: 0,
                    totalAmount: 0,
                });
                next();
            }}
        >
            {({ handleSubmit }) => (
                <Form>
                    <Row>
                        <Col xs={12}>
                            <p>
                                Je schrijft je in voor de energiegemeenschap <strong>{project.name}</strong>.
                            </p>
                            <p>
                                In de volgende stap controleren en verzamelen we de gegevens die nodig zijn voor je
                                inschrijving.
                            </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ButtonGroup aria-label="Steps" className="float-right">
                                <Button className={'w-button'} size="sm" onClick={handleSubmit}>
                                    Ga naar gegevens
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default StepOneEnergyCommunity;
