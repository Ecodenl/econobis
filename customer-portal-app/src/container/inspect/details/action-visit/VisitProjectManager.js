import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import * as Yup from 'yup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { ClipLoader } from 'react-spinners';
import InputTextDate from '../../../../components/form/InputTextDate';

function VisitProjectManager({ history, initialQuotationRequest, handleSubmit, getStatusOptions }) {
    const validationSchema = Yup.object().shape({});

    return (
        <>
            <Formik
                initialValues={initialQuotationRequest}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, setFieldValue, isSubmitting, status, values, handleSubmit }) => {
                    return (
                        <Form>
                            <Row>
                                <Col>
                                    <FormLabel className={'field-label'}>Naam</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={initialQuotationRequest.opportunity.intake.contact.fullName}
                                        readOnly={true}
                                    />
                                    <FormLabel className={'field-label'}>Adres</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={initialQuotationRequest.opportunity.intake.address.streetPostalCodeCity}
                                        readOnly={true}
                                    />
                                    <FormLabel className={'field-label'}>Telefoon</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={initialQuotationRequest.opportunity.intake.contact.primaryphoneNumber}
                                        readOnly={true}
                                    />
                                    <FormLabel className={'field-label'}>Email</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={initialQuotationRequest.opportunity.intake.contact.primaryEmailAddress}
                                        readOnly={true}
                                    />
                                    <FormLabel className={'field-label'}>Omschrijving</FormLabel>
                                    {initialQuotationRequest.quotationText}
                                    <FormLabel className={'field-label'}>Status</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={
                                            initialQuotationRequest.opportunityAction.name +
                                            ' - ' +
                                            initialQuotationRequest.status.name
                                        }
                                        readOnly={true}
                                    />
                                    <FormLabel htmlFor="date_planned" className={'field-label'}>
                                        Datum afspraak
                                    </FormLabel>
                                    <Field name="datePlanned">
                                        {({ field }) => (
                                            <InputTextDate
                                                name="datePlanned"
                                                field={field}
                                                type="datetime-local"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id="date_planned"
                                                placeholder={'Datum afspraak'}
                                                step="900"
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_recorded" className={'field-label'}>
                                        Datum opname
                                    </FormLabel>
                                    <Field name="dateRecorded">
                                        {({ field }) => (
                                            <InputTextDate
                                                name="dateRecorded"
                                                field={field}
                                                type="datetime-local"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id="date_recorded"
                                                placeholder={'Datum opname'}
                                                step="900"
                                            />
                                        )}
                                    </Field>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <ButtonGroup className="float-right">
                                        <Button
                                            variant={'outline-dark'}
                                            size="sm"
                                            onClick={function() {
                                                history.push(`/schouwen`);
                                            }}
                                        >
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

export default VisitProjectManager;
