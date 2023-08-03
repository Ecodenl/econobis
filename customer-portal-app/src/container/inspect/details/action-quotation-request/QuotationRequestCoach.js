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
import Select from '../../../../components/form/Select';
import InputTextCurrency from '../../../../components/form/InputTextCurrency';

function QuotationRequestCoach({
    history,
    initialQuotationRequest,
    isOrganisationContact,
    handleSubmit,
    getStatusOptions,
}) {
    // const [underReview, setUnderReview] = useState(false);
    const [approved, setApproved] = useState(false);

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
                                    <Field name="status.id">
                                        {({ field }) => (
                                            <Select
                                                name="status.id"
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="status_id"
                                                placeholder={'Status'}
                                                options={getStatusOptions()}
                                                emptyOption={false}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel className={'field-label'}>Offerte bedrag</FormLabel>
                                    <Field name="quotationAmount">
                                        {({ field }) => (
                                            <InputTextCurrency
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="amount_optioned"
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="created_at" className={'field-label'}>
                                        Datum gemaakt op
                                    </FormLabel>
                                    <Field name="createdAt">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="datetime-local"
                                                // errors={errors}
                                                // touched={touched}
                                                // onChangeAction={setFieldValue}
                                                id="created_at"
                                                placeholder={'Datum gemaakt op'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
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
                                    <FormLabel htmlFor="date_released" className={'field-label'}>
                                        Datum uitgebracht
                                    </FormLabel>
                                    <Field name="dateReleased">
                                        {({ field }) => (
                                            <InputTextDate
                                                name="dateReleased"
                                                field={field}
                                                type="datetime-local"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id="date_released"
                                                placeholder={'Datum uitgebracht'}
                                                readOnly={false}
                                                step="900"
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_under_review" className={'field-label'}>
                                        Datum in behandeling
                                    </FormLabel>
                                    <Field name="dateUnderReview">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                // errors={errors}
                                                // touched={touched}
                                                // onChangeAction={setFieldValue}
                                                id="date_under_review"
                                                placeholder={'Datum in behandeling'}
                                                // readOnly={
                                                //     underReview || values.status?.codeRef === 'under-review'
                                                //         ? false
                                                //         : true
                                                // }
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_approved_external" className={'field-label'}>
                                        Datum akkoord extern
                                    </FormLabel>
                                    <Field name="dateApprovedExternal">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id="date_approved_external"
                                                placeholder={'Datum akkoord extern'}
                                                readOnly={
                                                    approved || values.status?.codeRef === 'approved' ? false : true
                                                }
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_executed" className={'field-label'}>
                                        Datum uitgevoerd
                                    </FormLabel>
                                    <Field name="dateExecuted">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id="date_executed"
                                                placeholder={'Datum uitgevoerd'}
                                                readOnly={false}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel className={'field-label'}>Opmerkingen externe partij</FormLabel>
                                    {initialQuotationRequest.externalpartyNote
                                        ? initialQuotationRequest.externalpartyNote
                                        : 'Geen'}
                                    <FormLabel className={'field-label'}>Opmerkingen</FormLabel>
                                    <Field
                                        name="coachOrOrganisationNote"
                                        component="textarea"
                                        className="form-control input-sm mb-2"
                                    />
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

export default QuotationRequestCoach;
