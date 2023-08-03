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

function QuotationRequestExternalParty({ history, initialQuotationRequest, handleSubmit, getStatusOptions }) {
    const [underReview, setUnderReview] = useState(false);
    const [approved, setApproved] = useState(false);
    const [notApproved, setNotApproved] = useState(false);

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
                                    <FormLabel className={'field-label'}>Offerte bedrag</FormLabel>
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
                                    <FormLabel htmlFor="date_under_review" className={'field-label'}>
                                        Datum in behandeling
                                    </FormLabel>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <Field name="dateUnderReview">
                                                {({ field }) => (
                                                    <InputTextDate
                                                        field={field}
                                                        type="date"
                                                        errors={errors}
                                                        touched={touched}
                                                        onChangeAction={setFieldValue}
                                                        id="date_under_review"
                                                        placeholder={'Datum in behandeling'}
                                                        readOnly={
                                                            underReview || values.status?.codeRef === 'under-review'
                                                                ? false
                                                                : true
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Button
                                                variant={
                                                    underReview || values.status?.codeRef === 'under-review'
                                                        ? 'dark'
                                                        : 'outline-dark'
                                                }
                                                size="sm"
                                                onClick={() => {
                                                    setUnderReview(true);
                                                    setFieldValue('dateUnderReview', moment().format('YYYY-MM-DD'));
                                                }}
                                            >
                                                {underReview || values.status?.codeRef === 'under-review'
                                                    ? 'In behandeling'
                                                    : 'In behandeling nemen'}
                                            </Button>
                                        </div>
                                    </div>
                                    <FormLabel htmlFor="date_approved_external" className={'field-label'}>
                                        Datum akkoord extern
                                    </FormLabel>
                                    <div style={{ display: 'flex' }}>
                                        <div>
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
                                                            approved || values.status?.codeRef === 'approved'
                                                                ? false
                                                                : true
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Button
                                                variant={
                                                    approved || values.status?.codeRef === 'approved'
                                                        ? 'dark'
                                                        : 'outline-dark'
                                                }
                                                size="sm"
                                                onClick={() => {
                                                    setApproved(true);
                                                    setFieldValue(
                                                        'dateApprovedExternal',
                                                        moment().format('YYYY-MM-DD')
                                                    );
                                                }}
                                            >
                                                {approved || values.status?.codeRef === 'approved'
                                                    ? 'Goedgekeurd'
                                                    : 'Goedkeuren'}
                                            </Button>

                                            <Button
                                                variant={
                                                    notApproved || values.status?.codeRef === 'not-approved'
                                                        ? 'dark'
                                                        : 'outline-dark'
                                                }
                                                size="sm"
                                                onClick={() => {
                                                    setNotApproved(true);
                                                    setFieldValue('dateApprovedExternal', '');
                                                }}
                                            >
                                                {notApproved || values.status?.codeRef === 'not-approved'
                                                    ? 'Afgekeurd'
                                                    : 'Niet Goedkeuren'}
                                            </Button>
                                        </div>
                                    </div>
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

export default QuotationRequestExternalParty;
