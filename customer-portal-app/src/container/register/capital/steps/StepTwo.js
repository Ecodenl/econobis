import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaUndo } from 'react-icons/fa';
import DefaultContactView from '../../../account-info/DefaultContactView';
import Col from 'react-bootstrap/Col';
import DefaultContactEdit from '../../../account-info/DefaultContactEdit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //     .email()
    //     .required('Verplicht'),
});

function StepTwo({ previous, next, initialValues, energySuppliers, initialContact }) {
    const [editForm, setEditForm] = useState(false);

    return (
        <div>
            {editForm ? (
                <Formik
                    initialValues={initialContact}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log(values);
                        // next();
                    }}
                    render={({ errors, touched, setFieldValue, isSubmitting, values, handleSubmit }) => {
                        return (
                            <Form>
                                <DefaultContactEdit
                                    initialContact={initialContact}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    energySuppliers={energySuppliers}
                                />
                                <Row>
                                    <Col>
                                        <ButtonGroup aria-label="Steps" className="float-right">
                                            <Button className={'w-button'} size="sm" onClick={previous}>
                                                Terug
                                            </Button>
                                            <Button
                                                className={'w-button'}
                                                size="sm"
                                                onClick={function() {
                                                    setEditForm(false);
                                                }}
                                            >
                                                <FaUndo />
                                            </Button>
                                            <Button className={'w-button'} size="sm" onClick={handleSubmit}>
                                                Opslaan en doorgaan
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Form>
                        );
                    }}
                />
            ) : (
                <>
                    <DefaultContactView initialContact={initialContact} />
                    <Row>
                        <Col>
                            <ButtonGroup aria-label="Steps" className="float-right">
                                <Button className={'w-button'} size="sm" onClick={previous}>
                                    Terug
                                </Button>
                                <Button
                                    className={'w-button'}
                                    size="sm"
                                    onClick={function() {
                                        setEditForm(true);
                                    }}
                                >
                                    Wijzig
                                </Button>
                                <Button className={'w-button'} size="sm" onClick={next}>
                                    Ga naar voorwaarden
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default StepTwo;
