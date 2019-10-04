import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import DefaultContactPersonalEdit from '../../../contact-details/default-form-personal/Edit';
import { Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import ValidationSchemaPersonal from '../../../../helpers/ValidationSchemaPersonal';

function StepTwo({ previous, next, initialContact, handleSubmitContactValues }) {
    return (
        <div>
            <Formik
                initialValues={initialContact}
                enableReinitialize={true}
                validationSchema={ValidationSchemaPersonal.validationSchemaBasic.concat(
                    ValidationSchemaPersonal.validationSchemaAdditional
                )}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    handleSubmitContactValues(values, actions, next);
                }}
                render={({ errors, touched, setFieldValue, isSubmitting, values, handleSubmit }) => {
                    return (
                        <Form>
                            <DefaultContactPersonalEdit
                                initialContact={initialContact}
                                setFieldValue={setFieldValue}
                                values={values}
                                touched={touched}
                                errors={errors}
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
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span>
                                                    <ClipLoader color={'white'} size={14} />
                                                    Bezig met opslaan
                                                </span>
                                            ) : (
                                                'Opslaan en doorgaan'
                                            )}
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            />
        </div>
    );
}

export default StepTwo;
