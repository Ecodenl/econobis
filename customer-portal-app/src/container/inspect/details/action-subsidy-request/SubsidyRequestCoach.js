import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { ClipLoader } from 'react-spinners';
import InputTextDate from '../../../../components/form/InputTextDate';
import InputTextCurrency from '../../../../components/form/InputTextCurrency';
import ValidationSchemaQuotationRequest from '../../../../helpers/ValidationSchemaQuotationRequest';

function SubsidyRequestCoach({ redirectBack, initialQuotationRequest, handleSubmit }) {
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
                                    <FormLabel className={'field-label'}>Budgetaanvraagbedrag</FormLabel>
                                    <Field name="quotationAmount">
                                        {({ field }) => (
                                            <InputTextCurrency
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="quotation_amount"
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
                                                step="900"
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_approved_client" className={'field-label'}>
                                        Datum akkoord bewoner
                                    </FormLabel>
                                    <Field name="dateApprovedClient">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id="date_approved_client"
                                                placeholder={'Datum akkoord bewoner'}
                                                step="900"
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_approved_project_manager" className={'field-label'}>
                                        Datum akkoord projectleider
                                    </FormLabel>
                                    <Field name="dateApprovedProjectManager">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                id="date_approved_project_manager"
                                                placeholder={'Datum akkoord projectleider'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_under_review" className={'field-label'}>
                                        Datum toekenning in behandeling
                                    </FormLabel>
                                    <Field name="dateUnderReview">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                id="date_under_review"
                                                placeholder={'Datum toekenning in behandeling'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_approved_external" className={'field-label'}>
                                        Datum akkoord toekenning
                                    </FormLabel>
                                    <Field name="dateApprovedExternal">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                id="date_approved_external"
                                                placeholder={'Datum akkoord toekenning'}
                                                readOnly={true}
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
                                            />
                                        )}
                                    </Field>
                                    <FormLabel className={'field-label'}>Kosten aanpassing</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={initialQuotationRequest.costAdjustment}
                                        readOnly={true}
                                    />
                                    <FormLabel htmlFor="date_under_review_determination" className={'field-label'}>
                                        Datum vaststelling in behandeling
                                    </FormLabel>
                                    <Field name="dateUnderReviewDetermination">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                id="date_under_review_determination"
                                                placeholder={'Datum vaststelling in behandeling'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_approved_determination" className={'field-label'}>
                                        Datum akkoord vaststelling
                                    </FormLabel>
                                    <Field name="dateApprovedDetermination">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                id="date_approved_determination"
                                                placeholder={'Datum akkoord vaststelling'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel className={'field-label'}>Bedrag vaststelling</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={initialQuotationRequest.amountDetermination}
                                        readOnly={true}
                                    />

                                    <FormLabel className={'field-label'}>Opmerkingen</FormLabel>
                                    <Field
                                        name="coachOrOrganisationNote"
                                        component="textarea"
                                        className="form-control input-sm mb-2"
                                    />
                                    <FormLabel className={'field-label'}>Opmerkingen projectleider</FormLabel>
                                    {initialQuotationRequest.projectmanagerNote
                                        ? initialQuotationRequest.projectmanagerNote
                                        : 'Geen'}
                                    <FormLabel className={'field-label'}>Opmerkingen externe partij</FormLabel>
                                    {initialQuotationRequest.externalpartyNote
                                        ? initialQuotationRequest.externalpartyNote
                                        : 'Geen'}
                                    <FormLabel className={'field-label'}>Opmerkingen bewoner</FormLabel>
                                    {initialQuotationRequest.clientNote ? initialQuotationRequest.clientNote : 'Geen'}
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

export default SubsidyRequestCoach;
