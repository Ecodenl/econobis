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
import InputTextCurrency from '../../../../components/form/InputTextCurrency';
import ValidationSchemaQuotationRequest from '../../../../helpers/ValidationSchemaQuotationRequest';

function SubsidyRequestExternalParty({ history, initialQuotationRequest, handleSubmit }) {
    const [underReview, setUnderReview] = useState(initialQuotationRequest.status?.codeRef === 'under-review');
    const [approved, setApproved] = useState(
        initialQuotationRequest.status?.codeRef === 'approved'
            ? true
            : initialQuotationRequest.status?.codeRef === 'not-approved'
            ? false
            : null
    );
    const [underReviewDet, setUnderReviewDet] = useState(
        initialQuotationRequest.status?.codeRef === 'under-review-det'
    );
    const [approvedDet, setApprovedDet] = useState(
        initialQuotationRequest.status?.codeRef === 'approved-det'
            ? true
            : initialQuotationRequest.status?.codeRef === 'not-approved-det'
            ? false
            : null
    );

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
                                    <FormLabel htmlFor="date_under_review" className={'field-label'}>
                                        Datum toekenning in behandeling
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
                                                        placeholder={'Datum toekenning in behandeling'}
                                                        readOnly={underReview ? false : true}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Button
                                                variant={underReview ? 'dark' : 'outline-dark'}
                                                size="sm"
                                                onClick={() => {
                                                    setUnderReview(true);
                                                    setFieldValue('dateUnderReview', moment().format('YYYY-MM-DD'));
                                                }}
                                            >
                                                {underReview
                                                    ? 'Toekenning in behandeling'
                                                    : 'Toekenning in behandeling nemen'}
                                            </Button>
                                        </div>
                                    </div>
                                    <FormLabel htmlFor="date_approved_external" className={'field-label'}>
                                        Datum akkoord toekenning
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
                                                        placeholder={'Datum akkoord toekenning'}
                                                        readOnly={approved ? false : true}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Button
                                                variant={true === approved ? 'dark' : 'outline-dark'}
                                                size="sm"
                                                onClick={() => {
                                                    setApproved(true);
                                                    setFieldValue(
                                                        'dateApprovedExternal',
                                                        moment().format('YYYY-MM-DD')
                                                    );
                                                }}
                                            >
                                                {true === approved ? 'Toekenning goedgekeurd' : 'Toekenning goedkeuren'}
                                            </Button>

                                            <Button
                                                variant={false === approved ? 'dark' : 'outline-dark'}
                                                size="sm"
                                                onClick={() => {
                                                    setApproved(false);
                                                    setFieldValue('dateApprovedExternal', '');
                                                }}
                                            >
                                                {false === approved
                                                    ? 'Toekenning afgekeurd'
                                                    : 'Toekenning niet goedkeuren'}
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
                                                id="date_executed"
                                                placeholder={'Datum uitgevoerd'}
                                                readOnly={true}
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
                                    <FormLabel className={'field-label'}>Bedrag toekenning</FormLabel>
                                    <Field name="awardAmount">
                                        {({ field }) => (
                                            <InputTextCurrency
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="award_amount"
                                            />
                                        )}
                                    </Field>
                                    <FormLabel htmlFor="date_under_review_determination" className={'field-label'}>
                                        Datum vaststelling in behandeling
                                    </FormLabel>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <Field name="dateUnderReviewDetermination">
                                                {({ field }) => (
                                                    <InputTextDate
                                                        field={field}
                                                        type="date"
                                                        errors={errors}
                                                        touched={touched}
                                                        onChangeAction={setFieldValue}
                                                        id="date_under_review_determination"
                                                        placeholder={'Datum vaststelling in behandeling'}
                                                        readOnly={underReviewDet ? false : true}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Button
                                                variant={underReviewDet ? 'dark' : 'outline-dark'}
                                                size="sm"
                                                onClick={() => {
                                                    setUnderReviewDet(true);
                                                    setFieldValue(
                                                        'dateUnderReviewDetermination',
                                                        moment().format('YYYY-MM-DD')
                                                    );
                                                }}
                                            >
                                                {underReviewDet
                                                    ? 'Vaststelling in behandeling'
                                                    : 'Vaststelling in behandeling nemen'}
                                            </Button>
                                        </div>
                                    </div>

                                    <FormLabel htmlFor="date_approved_determination" className={'field-label'}>
                                        Datum akkoord vaststelling
                                    </FormLabel>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <Field name="dateApprovedDetermination">
                                                {({ field }) => (
                                                    <InputTextDate
                                                        field={field}
                                                        type="date"
                                                        errors={errors}
                                                        touched={touched}
                                                        onChangeAction={setFieldValue}
                                                        id="date_approved_determination"
                                                        placeholder={'Datum akkoord vaststelling'}
                                                        readOnly={approvedDet ? false : true}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Button
                                                variant={true === approvedDet ? 'dark' : 'outline-dark'}
                                                size="sm"
                                                onClick={() => {
                                                    setApprovedDet(true);
                                                    setFieldValue(
                                                        'dateApprovedDetermination',
                                                        moment().format('YYYY-MM-DD')
                                                    );
                                                }}
                                            >
                                                {true === approvedDet
                                                    ? 'Vaststelling goedgekeurd'
                                                    : 'Vaststelling goedkeuren'}
                                            </Button>

                                            <Button
                                                variant={false === approvedDet ? 'dark' : 'outline-dark'}
                                                size="sm"
                                                onClick={() => {
                                                    setApprovedDet(false);
                                                    setFieldValue('dateApprovedDetermination', '');
                                                }}
                                            >
                                                {false === approvedDet
                                                    ? 'Vaststelling afgekeurd'
                                                    : 'Vaststelling niet goedkeuren'}
                                            </Button>
                                        </div>
                                    </div>

                                    <FormLabel className={'field-label'}>Bedrag vaststelling</FormLabel>
                                    <Field name="amountDetermination">
                                        {({ field }) => (
                                            <InputTextCurrency
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="amount_determination"
                                            />
                                        )}
                                    </Field>

                                    {/*<FormLabel className={'field-label'}>Opmerkingen coach/organisatie</FormLabel>*/}
                                    {/*{initialQuotationRequest.coachOrOrganisationNote*/}
                                    {/*    ? initialQuotationRequest.coachOrOrganisationNote*/}
                                    {/*    : 'Geen'}*/}

                                    {/*<FormLabel className={'field-label'}>Opmerkingen projectleider</FormLabel>*/}
                                    {/*{initialQuotationRequest.projectmanagerNote*/}
                                    {/*    ? initialQuotationRequest.projectmanagerNote*/}
                                    {/*    : 'Geen'}*/}

                                    <FormLabel className={'field-label'}>Opmerkingen</FormLabel>
                                    <Field
                                        name="externalpartyNote"
                                        component="textarea"
                                        className="form-control input-sm mb-2"
                                    />

                                    {/*<FormLabel className={'field-label'}>Opmerkingen bewoner</FormLabel>*/}
                                    {/*{initialQuotationRequest.clientNote*/}
                                    {/*    ? initialQuotationRequest.clientNote*/}
                                    {/*    : 'Geen'}*/}
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

export default SubsidyRequestExternalParty;
