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

function QuotationRequestProjectManager({ redirectBack, initialQuotationRequest, handleSubmit }) {
    const [pmApproved, setPmApproved] = useState(
        initialQuotationRequest.status?.codeRef === 'pm-approved'
            ? true
            : initialQuotationRequest.status?.codeRef === 'pm-not-approved'
            ? false
            : null
    );

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
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Button
                                                variant={true === pmApproved ? 'dark' : 'outline-dark'}
                                                size="sm"
                                                onClick={() => {
                                                    setPmApproved(true);
                                                    setFieldValue(
                                                        'dateApprovedProjectManager',
                                                        moment().format('YYYY-MM-DD')
                                                    );
                                                }}
                                            >
                                                {true === pmApproved ? 'Goedgekeurd' : 'Goedkeuren'}
                                            </Button>
                                            <Button
                                                variant={false === pmApproved ? 'dark' : 'outline-dark'}
                                                size="sm"
                                                onClick={() => {
                                                    setPmApproved(false);
                                                    setFieldValue('dateApprovedProjectManager', '');
                                                }}
                                            >
                                                {false === pmApproved ? 'Afgekeurd' : 'Niet goedkeuren'}
                                            </Button>
                                        </div>
                                    </div>

                                    <FormLabel className={'field-label'}>Opmerkingen coach/organisatie</FormLabel>
                                    {initialQuotationRequest.coachOrOrganisationNote
                                        ? initialQuotationRequest.coachOrOrganisationNote
                                        : 'Geen'}
                                    <FormLabel className={'field-label'}>Opmerkingen</FormLabel>
                                    <Field
                                        name="projectmanagerNote"
                                        component="textarea"
                                        className="form-control input-sm mb-2"
                                    />
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

export default QuotationRequestProjectManager;
