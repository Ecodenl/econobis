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

function VisitOccupant({ redirectBack, initialQuotationRequest, handleSubmit }) {
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
                                                id="date_planned_attempt1"
                                                placeholder={'Datum afspraakpoging 1'}
                                                readOnly={true}
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
                                                        id="date_planned_attempt2"
                                                        placeholder={'Datum afspraakpoging 2'}
                                                        readOnly={true}
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
                                                        id="date_planned_attempt3"
                                                        placeholder={'Datum afspraakpoging 3'}
                                                        readOnly={true}
                                                    />
                                                )}
                                            </Field>
                                        </>
                                    ) : null}
                                    <FormLabel htmlFor="date_planned" className={'field-label'}>
                                        Datum afspraak
                                    </FormLabel>
                                    <Field name="datePlanned">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="datetime-local"
                                                id="date_planned"
                                                placeholder={'Datum afspraak'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_recorded" className={'field-label'}>
                                        Afspraak gedaan op
                                    </FormLabel>
                                    <Field name="dateRecorded">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="datetime-local"
                                                id="date_recorded"
                                                placeholder={'Afspraak gedaan op'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel className={'field-label'}>Opmerkingen coach/organisatie</FormLabel>
                                    {initialQuotationRequest.coachOrOrganisationNote
                                        ? initialQuotationRequest.coachOrOrganisationNote
                                        : 'Geen'}
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <ButtonGroup className="float-right">
                                        <Button variant={'outline-dark'} size="sm" onClick={() => redirectBack()}>
                                            Terug naar overzicht
                                        </Button>
                                        {/*<Button*/}
                                        {/*    variant={'outline-dark'}*/}
                                        {/*    size="sm"*/}
                                        {/*    onClick={() => redirectBack()}*/}
                                        {/*>*/}
                                        {/*    Annuleren*/}
                                        {/*</Button>*/}
                                        {/*<Button*/}
                                        {/*    className={'w-button'}*/}
                                        {/*    size="sm"*/}
                                        {/*    onClick={handleSubmit}*/}
                                        {/*    disabled={isSubmitting}*/}
                                        {/*>*/}
                                        {/*    {isSubmitting ? (*/}
                                        {/*        <span>*/}
                                        {/*            <ClipLoader color={'white'} size={14} />*/}
                                        {/*            Bezig met opslaan*/}
                                        {/*        </span>*/}
                                        {/*    ) : (*/}
                                        {/*        'Opslaan'*/}
                                        {/*    )}*/}
                                        {/*</Button>*/}
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

export default VisitOccupant;
