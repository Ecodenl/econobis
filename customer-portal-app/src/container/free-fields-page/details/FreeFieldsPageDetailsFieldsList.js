import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import * as Yup from 'yup';
import DashboardWidget from '../../dashboard/widget';
import { FaFileDownload } from 'react-icons/all';
import { Button } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

function FreeFieldsPageDetailsFieldsList({ redirectBack, initialPortalFreeFieldsPage, handleSubmit }) {
    // const validationSchema = ValidationSchemaQuotationRequest.validationSchemaBasic;
    const validationSchema = Yup.object().shape({});

    return (
        <>
            <Formik
                initialValues={initialPortalFreeFieldsPage}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, setFieldValue, isSubmitting, status, values, handleSubmit }) => {
                    return (
                        <Form>
                            <Row>
                                {initialPortalFreeFieldsPage.portalFreeFieldsFields.map(portalFreeFieldsField => (
                                    <Col>{portalFreeFieldsField.freeFieldsField.fieldName}</Col>
                                    //         <FormLabel className={'field-label'}>Naam</FormLabel>
                                    // <input
                                    //     type="text"
                                    //     className={`text-input w-input content`}
                                    //     value={initialPortalFreeFieldsPage.opportunity.intake.contact.fullName}
                                    //     readOnly={true}
                                    // />
                                    //
                                ))}
                            </Row>

                            <br />
                            <Row>
                                <Col>
                                    <ButtonGroup className="float-right">
                                        <Button variant={'outline-dark'} size="sm" onClick={() => redirectBack()}>
                                            Annuleren
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
                                                'Opslaan'
                                            )}
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <br />
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default FreeFieldsPageDetailsFieldsList;
