import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { ClipLoader } from 'react-spinners';
import InputTextDate from '../../../../components/form/InputTextDate';
import ValidationSchemaQuotationRequest from '../../../../helpers/ValidationSchemaQuotationRequest';

function RedirectionExternalParty({ redirectBack, initialQuotationRequest, handleSubmit }) {
    const validationSchema = ValidationSchemaQuotationRequest.validationSchemaBasic;

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
                                    {/*<FormLabel className={'field-label'}>Omschrijving</FormLabel>*/}
                                    {/*{initialQuotationRequest.quotationText}*/}
                                    <FormLabel className={'field-label'}>Maatregel specifiek</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={initialQuotationRequest.measureNames}
                                        readOnly={true}
                                    />
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
                                    <FormLabel htmlFor="created_at" className={'field-label'}>
                                        Datum gemaakt op
                                    </FormLabel>
                                    <Field name="createdAt">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="datetime-local"
                                                id="created_at"
                                                placeholder={'Datum gemaakt op'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_planned_attempt1" className={'field-label'}>
                                        Datum afspraakpoging 1
                                    </FormLabel>
                                    <Field name="datePlannedAttempt1">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id="date_planned_attempt1"
                                                placeholder={'Datum afspraakpoging 1'}
                                                readOnly={values.datePlannedAttempt2 ? true : false}
                                            />
                                        )}
                                    </Field>
                                    {values.datePlannedAttempt1 ? (
                                        <>
                                            <FormLabel htmlFor="date_planned_attempt2" className={'field-label'}>
                                                Datum afspraakpoging 2
                                            </FormLabel>
                                            <Field name="datePlannedAttempt2">
                                                {({ field }) => (
                                                    <InputTextDate
                                                        field={field}
                                                        type="date"
                                                        errors={errors}
                                                        touched={touched}
                                                        onChangeAction={setFieldValue}
                                                        id="date_planned_attempt2"
                                                        placeholder={'Datum afspraakpoging 2'}
                                                        readOnly={values.datePlannedAttempt3 ? true : false}
                                                    />
                                                )}
                                            </Field>
                                        </>
                                    ) : null}
                                    {values.datePlannedAttempt2 ? (
                                        <>
                                            <FormLabel htmlFor="date_planned_attempt3" className={'field-label'}>
                                                Datum afspraakpoging 3
                                            </FormLabel>
                                            <Field name="datePlannedAttempt3">
                                                {({ field }) => (
                                                    <InputTextDate
                                                        field={field}
                                                        type="date"
                                                        errors={errors}
                                                        touched={touched}
                                                        onChangeAction={setFieldValue}
                                                        id="date_planned_attempt3"
                                                        placeholder={'Datum afspraakpoging 3'}
                                                    />
                                                )}
                                            </Field>
                                        </>
                                    ) : null}
                                    <FormLabel htmlFor="date_executed" className={'field-label'}>
                                        Datum afgehandeld
                                    </FormLabel>
                                    <Field name="dateExecuted">
                                        {({ field }) => (
                                            <InputTextDate
                                                name="dateExecuted"
                                                field={field}
                                                type="date"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id="date_executed"
                                                placeholder={'Datum afgehandeld'}
                                                step="900"
                                            />
                                        )}
                                    </Field>
                                    <FormLabel className={'field-label'}>Opmerkingen</FormLabel>
                                    <Field
                                        name="externalpartyNote"
                                        component="textarea"
                                        className="form-control input-sm mb-2"
                                    />
                                </Col>
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

export default RedirectionExternalParty;
