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
import moment from 'moment/moment';

function SubsidyRequestCoach({ history, initialQuotationRequest, handleSubmit, getStatusOptions }) {
    const [approved, setApproved] = useState(false);
    const [pmApproved, setPmApproved] = useState(false);
    const [pmNotApproved, setPmNotApproved] = useState(false);

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
                                    <FormLabel className={'field-label'}>Budget bedrag</FormLabel>
                                    <input
                                        type="text"
                                        className={`text-input w-input content`}
                                        value={initialQuotationRequest.quotationAmount}
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
                                                // errors={errors}
                                                // touched={touched}
                                                // onChangeAction={setFieldValue}
                                                id="created_at"
                                                placeholder={'Datum gemaakt op'}
                                                readOnly={true}
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
                                                // errors={errors}
                                                // touched={touched}
                                                // onChangeAction={setFieldValue}
                                                id="date_released"
                                                placeholder={'Datum uitgebracht'}
                                                readOnly={true}
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
                                                id="date_approved_client"
                                                placeholder={'Datum akkoord bewoner'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_approved_project_manager" className={'field-label'}>
                                        Datum akkoord projectleider
                                    </FormLabel>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <Field name="dateApprovedProjectManager">
                                                {({ field }) => (
                                                    <InputTextDate
                                                        field={field}
                                                        type="date"
                                                        errors={errors}
                                                        touched={touched}
                                                        onChangeAction={setFieldValue}
                                                        id="date_approved_project_manager"
                                                        placeholder={'Datum akkoord projectleider'}
                                                        readOnly={false}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Button
                                                variant={
                                                    pmApproved || values.status?.codeRef === 'pm-approved'
                                                        ? 'dark'
                                                        : 'outline-dark'
                                                }
                                                size="sm"
                                                onClick={() => {
                                                    setPmApproved(true);
                                                    setFieldValue(
                                                        'dateApprovedProjectManager',
                                                        moment().format('YYYY-MM-DD')
                                                    );
                                                }}
                                            >
                                                {pmApproved || values.status?.codeRef === 'pm-approved'
                                                    ? 'Goedgekeurd'
                                                    : 'Goedkeuren'}
                                            </Button>
                                            <Button
                                                variant={
                                                    pmNotApproved || values.status?.codeRef === 'pm-not-approved'
                                                        ? 'dark'
                                                        : 'outline-dark'
                                                }
                                                size="sm"
                                                onClick={() => {
                                                    setPmNotApproved(true);
                                                    setFieldValue('dateApprovedProjectManager', '');
                                                }}
                                            >
                                                {pmNotApproved || values.status?.codeRef === 'pm-not-approved'
                                                    ? 'Afgekeurd'
                                                    : 'Niet Goedkeuren'}
                                            </Button>
                                        </div>
                                    </div>
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
                                                // errors={errors}
                                                // touched={touched}
                                                // onChangeAction={setFieldValue}
                                                id="date_executed"
                                                placeholder={'Datum uitgevoerd'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel className={'field-label'}>Opmerkingen coach/organisatie</FormLabel>
                                    {initialQuotationRequest.coachOrOrganisationNote
                                        ? initialQuotationRequest.coachOrOrganisationNote
                                        : 'Geen'}

                                    <FormLabel className={'field-label'}>Opmerkingen externe partij</FormLabel>
                                    {initialQuotationRequest.externalpartyNote
                                        ? initialQuotationRequest.externalpartyNote
                                        : 'Geen'}
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

export default SubsidyRequestCoach;
