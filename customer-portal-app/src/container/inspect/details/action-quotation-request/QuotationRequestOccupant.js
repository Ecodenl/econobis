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
import moment from 'moment';
import { isEmpty } from 'lodash';

function QuotationRequestOccupant({ redirectBack, initialQuotationRequest, handleSubmit }) {
    const [approved, setApproved] = useState(!isEmpty(initialQuotationRequest.dateApprovedClient));
    const [notApproved, setNotApproved] = useState(initialQuotationRequest.notApprovedClient);

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
                                    <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                                    {initialQuotationRequest.opportunity.intake.contact.number}
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
                                    <FormLabel className={'field-label'}>Offertebedrag</FormLabel>
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
                                                field={field}
                                                type="datetime-local"
                                                id="date_planned"
                                                placeholder={'Datum afspraak'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_recorded" className={'field-label'}>
                                        Afspraak afgerond
                                    </FormLabel>
                                    <Field name="dateRecorded">
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="datetime-local"
                                                id="date_recorded"
                                                placeholder={'Afspraak afgerond'}
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
                                                field={field}
                                                type="datetime-local"
                                                id="date_released"
                                                placeholder={'Datum uitgebracht'}
                                                readOnly={true}
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_approved_client" className={'field-label'}>
                                        Datum akkoord bewoner
                                    </FormLabel>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <Field name="dateApprovedClient">
                                                {({ field }) => (
                                                    <InputTextDate
                                                        field={field}
                                                        type="date"
                                                        errors={errors}
                                                        touched={touched}
                                                        onChangeAction={setFieldValue}
                                                        id="date_approved_client"
                                                        readOnly={
                                                            ![
                                                                'under-review-occupant',
                                                                'approved',
                                                                'not-approved',
                                                            ].includes(initialQuotationRequest.status.codeRef) ||
                                                            notApproved
                                                        }
                                                        placeholder={'Datum akkoord bewoner'}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        {['under-review-occupant', 'approved', 'not-approved'].includes(
                                            initialQuotationRequest.status.codeRef
                                        ) ? (
                                            <div>
                                                <Button
                                                    variant={true === approved ? 'success' : 'outline-dark'}
                                                    size="sm"
                                                    onClick={() => {
                                                        setApproved(true);
                                                        setFieldValue(
                                                            'dateApprovedClient',
                                                            moment().format('YYYY-MM-DD')
                                                        );
                                                        setNotApproved(false);
                                                        setFieldValue('notApprovedClient', false);
                                                    }}
                                                    disabled={approved}
                                                >
                                                    {true === approved ? 'Goedgekeurd' : 'Goedkeuren'}
                                                </Button>
                                                <Button
                                                    variant={true === notApproved ? 'danger' : 'outline-dark'}
                                                    size="sm"
                                                    onClick={() => {
                                                        setApproved(false);
                                                        setFieldValue('dateApprovedClient', '');
                                                        setNotApproved(true);
                                                        setFieldValue('notApprovedClient', true);
                                                    }}
                                                    disabled={notApproved}
                                                >
                                                    {true === notApproved ? 'Afgekeurd' : 'Niet goedkeuren'}
                                                </Button>
                                            </div>
                                        ) : null}
                                    </div>
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
                                    <FormLabel className={'field-label'}>Opmerkingen coach/organisatie</FormLabel>
                                    {initialQuotationRequest.coachOrOrganisationNote
                                        ? initialQuotationRequest.coachOrOrganisationNote
                                        : 'Geen'}
                                    <FormLabel className={'field-label'}>Opmerkingen projectleider</FormLabel>
                                    {initialQuotationRequest.projectmanagerNote
                                        ? initialQuotationRequest.projectmanagerNote
                                        : 'Geen'}
                                    <FormLabel className={'field-label'}>Opmerkingen externe partij</FormLabel>
                                    {initialQuotationRequest.externalpartyNote
                                        ? initialQuotationRequest.externalpartyNote
                                        : 'Geen'}
                                    <FormLabel className={'field-label'}>Opmerkingen</FormLabel>
                                    <Field
                                        name="clientNote"
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

export default QuotationRequestOccupant;
