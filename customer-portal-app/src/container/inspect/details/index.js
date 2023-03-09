import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../components/general/LoadingView';
import { Field, Form, Formik } from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import * as Yup from 'yup';
import QuotationRequestAPI from '../../../api/quotation-request/QuotationRequestAPI';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { ClipLoader } from 'react-spinners';
import InputTextDate from '../../../components/form/InputTextDate';
import InspectDetailsDocumentTable from './document-table';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import Select from '../../../components/form/Select';
import moment from 'moment/moment';

function InspectDetails({ match, history, user }) {
    const [isLoading, setLoading] = useState(true);
    const [initialQuotationRequest, setInitialQuotationRequest] = useState({});
    const [statuses, setStatuses] = useState([]);
    const [underReview, setUnderReview] = useState(false);
    const [approved, setApproved] = useState(false);
    const [notApproved, setNotApproved] = useState(false);
    const [pmApproved, setPmApproved] = useState(false);
    const [pmNotApproved, setPmNotApproved] = useState(false);

    const validationSchema = Yup.object().shape({});

    const handleSubmit = (values, actions) => {
        QuotationRequestAPI.update({
            id: match.params.id,
            dateRecorded: values.dateRecorded,
            datePlanned: values.datePlanned,
            dateReleased: values.dateReleased,
            dateApprovedProjectManager: values.dateApprovedProjectManager,
            dateApprovedExternal: values.dateApprovedExternal,
            opportunityStatusId: values.opportunity.status.id,
            opportunityActionId: values.opportunityAction.id,
            externalpartyNote: values.externalpartyNote,
            quotationText: values.quotationText,
            statusId: values.status.id,
            dateUnderReview: values.dateUnderReview,
        }).then(response => {
            history.push('/schouwen');
        });
    };

    const previewDocument = (event, documentId) => {
        event.preventDefault();
        history.push(`/schouwen/${match.params.id}/document/${documentId}`);
    };

    useEffect(() => {
        QuotationRequestAPI.fetchById(match.params.id).then(response => {
            setInitialQuotationRequest(response.data);
            QuotationRequestAPI.fetchQuotationRequestStatus(response.data.opportunityAction.id).then(payload => {
                setStatuses(payload.data.data);
            });
            setLoading(false);
        });
    }, []);

    const getStatusOptions = () => {
        return statuses.map(status => {
            return {
                id: status.id,
                name: initialQuotationRequest?.opportunityAction.name + ' - ' + status.name,
            };
        });
    };

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <div>
                        <Formik
                            initialValues={initialQuotationRequest}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            render={({
                                errors,
                                touched,
                                setFieldValue,
                                isSubmitting,
                                status,
                                values,
                                handleSubmit,
                            }) => {
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
                                                    value={
                                                        initialQuotationRequest.opportunity.intake.address
                                                            .streetPostalCodeCity
                                                    }
                                                    readOnly={true}
                                                />
                                                <FormLabel className={'field-label'}>Telefoon</FormLabel>
                                                <input
                                                    type="text"
                                                    className={`text-input w-input content`}
                                                    value={
                                                        initialQuotationRequest.opportunity.intake.contact
                                                            .primaryphoneNumber
                                                    }
                                                    readOnly={true}
                                                />
                                                <FormLabel className={'field-label'}>Email</FormLabel>
                                                <input
                                                    type="text"
                                                    className={`text-input w-input content`}
                                                    value={
                                                        initialQuotationRequest.opportunity.intake.contact
                                                            .primaryEmailAddress
                                                    }
                                                    readOnly={true}
                                                />
                                                <FormLabel className={'field-label'}>Status</FormLabel>
                                                {user.inspectionPersonTypeId === 'coach' ? (
                                                    <Field
                                                        name="status.id"
                                                        render={({ field }) => (
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
                                                    />
                                                ) : (
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
                                                )}
                                                {user.inspectionPersonTypeId === 'externalparty' ? (
                                                    <>
                                                        <FormLabel className={'field-label'}>Omschrijving</FormLabel>
                                                        {initialQuotationRequest.quotationText}
                                                    </>
                                                ) : user.inspectionPersonTypeId === 'projectmanager' ? (
                                                    <>
                                                        <FormLabel className={'field-label'}>Omschrijving</FormLabel>
                                                        <Field
                                                            name="quotationText"
                                                            component="textarea"
                                                            className="form-control input-sm mb-2"
                                                        />
                                                    </>
                                                ) : null}
                                                {user.inspectionPersonTypeId === 'coach' ? (
                                                    <>
                                                        <FormLabel htmlFor="date_planned" className={'field-label'}>
                                                            Datum afspraak
                                                        </FormLabel>
                                                        <Field
                                                            name="datePlanned"
                                                            render={({ field }) => (
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
                                                        />
                                                        {initialQuotationRequest.opportunityAction.codeRef ===
                                                            'quotation-request' ||
                                                        initialQuotationRequest.opportunityAction.codeRef ===
                                                            'visit' ? (
                                                            <>
                                                                <FormLabel
                                                                    htmlFor="date_recorded"
                                                                    className={'field-label'}
                                                                >
                                                                    Datum opname
                                                                </FormLabel>
                                                                <Field
                                                                    name="dateRecorded"
                                                                    render={({ field }) => (
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
                                                                />
                                                            </>
                                                        ) : null}
                                                        {initialQuotationRequest.opportunityAction.codeRef ===
                                                            'quotation-request' ||
                                                        initialQuotationRequest.opportunityAction.codeRef ===
                                                            'subsidy-request' ? (
                                                            <>
                                                                <FormLabel
                                                                    htmlFor="date_released"
                                                                    className={'field-label'}
                                                                >
                                                                    Datum uitgebracht
                                                                </FormLabel>
                                                                <Field
                                                                    name="dateReleased"
                                                                    render={({ field }) => (
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
                                                                />
                                                            </>
                                                        ) : null}
                                                        {initialQuotationRequest.opportunityAction.codeRef ===
                                                        'subsidy-request' ? (
                                                            <>
                                                                <FormLabel
                                                                    htmlFor="date_approved_client"
                                                                    className={'field-label'}
                                                                >
                                                                    Datum akkoord bewoner
                                                                </FormLabel>
                                                                <Field
                                                                    name="dateApprovedClient"
                                                                    render={({ field }) => (
                                                                        <InputTextDate
                                                                            field={field}
                                                                            type="date"
                                                                            id="date_approved_client"
                                                                            placeholder={'Datum akkoord bewoner'}
                                                                            readOnly={true}
                                                                        />
                                                                    )}
                                                                />
                                                            </>
                                                        ) : null}
                                                    </>
                                                ) : null}

                                                {user.inspectionPersonTypeId === 'coach' ||
                                                user.inspectionPersonTypeId === 'projectmanager' ? (
                                                    <>
                                                        {initialQuotationRequest.opportunityAction.codeRef ===
                                                        'subsidy-request' ? (
                                                            <>
                                                                <FormLabel
                                                                    htmlFor="date_approved_project_manager"
                                                                    className={'field-label'}
                                                                >
                                                                    Datum akkoord projectleider
                                                                </FormLabel>
                                                                <div style={{ display: 'flex' }}>
                                                                    <div>
                                                                        <Field
                                                                            name="dateApprovedProjectManager"
                                                                            render={({ field }) => (
                                                                                <InputTextDate
                                                                                    field={field}
                                                                                    type="date"
                                                                                    errors={errors}
                                                                                    touched={touched}
                                                                                    onChangeAction={setFieldValue}
                                                                                    id="date_approved_project_manager"
                                                                                    placeholder={
                                                                                        'Datum akkoord projectleider'
                                                                                    }
                                                                                    readOnly={
                                                                                        // pmApproved &&
                                                                                        user.inspectionPersonTypeId ===
                                                                                        'projectmanager'
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    readOnly={
                                                                                        pmApproved &&
                                                                                        user.inspectionPersonTypeId !==
                                                                                            'projectmanager'
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    {user.inspectionPersonTypeId ===
                                                                    'projectmanager' ? (
                                                                        <div>
                                                                            <Button
                                                                                variant={
                                                                                    pmApproved ||
                                                                                    values.status?.codeRef ===
                                                                                        'pm-approved'
                                                                                        ? 'dark'
                                                                                        : 'outline-dark'
                                                                                }
                                                                                size="sm"
                                                                                onClick={() => {
                                                                                    // setFieldValue('status.id', 12);
                                                                                    setPmApproved(true);
                                                                                    setFieldValue(
                                                                                        'dateApprovedProjectManager',
                                                                                        moment().format('YYYY-MM-DD')
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {pmApproved ||
                                                                                values.status?.codeRef === 'pm-approved'
                                                                                    ? 'Goedgekeurd'
                                                                                    : 'Goedkeuren'}
                                                                            </Button>

                                                                            <Button
                                                                                variant={
                                                                                    pmNotApproved ||
                                                                                    values.status?.codeRef ===
                                                                                        'pm-not-approved'
                                                                                        ? 'dark'
                                                                                        : 'outline-dark'
                                                                                }
                                                                                size="sm"
                                                                                onClick={() => {
                                                                                    // setFieldValue('status.id', 13);
                                                                                    setPmNotApproved(true);
                                                                                    setFieldValue(
                                                                                        'dateApprovedProjectManager',
                                                                                        ''
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {pmNotApproved ||
                                                                                values.status?.codeRef ===
                                                                                    'pm-not-approved'
                                                                                    ? 'Afgekeurd'
                                                                                    : 'Niet Goedkeuren'}
                                                                            </Button>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </>
                                                ) : null}
                                                {user.inspectionPersonTypeId === 'externalparty' ? (
                                                    <>
                                                        {initialQuotationRequest.opportunityAction.codeRef ===
                                                            'quotation-request' ||
                                                        initialQuotationRequest.opportunityAction.codeRef ===
                                                            'subsidy-request' ? (
                                                            <>
                                                                <FormLabel
                                                                    htmlFor="date_under_review"
                                                                    className={'field-label'}
                                                                >
                                                                    Datum in behandeling
                                                                </FormLabel>
                                                                <div style={{ display: 'flex' }}>
                                                                    <div>
                                                                        <Field
                                                                            name="dateUnderReview"
                                                                            render={({ field }) => (
                                                                                <InputTextDate
                                                                                    field={field}
                                                                                    type="date"
                                                                                    errors={errors}
                                                                                    touched={touched}
                                                                                    onChangeAction={setFieldValue}
                                                                                    id="date_under_review"
                                                                                    placeholder={'Datum in behandeling'}
                                                                                    readOnly={
                                                                                        underReview ||
                                                                                        values.status?.codeRef ===
                                                                                            'under-review'
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Button
                                                                            variant={
                                                                                underReview ||
                                                                                values.status?.codeRef ===
                                                                                    'under-review'
                                                                                    ? 'dark'
                                                                                    : 'outline-dark'
                                                                            }
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                // setFieldValue('status.id', 16);
                                                                                setUnderReview(true);
                                                                                setFieldValue(
                                                                                    'dateUnderReview',
                                                                                    moment().format('YYYY-MM-DD')
                                                                                );
                                                                            }}
                                                                        >
                                                                            {underReview ||
                                                                            values.status?.codeRef === 'under-review'
                                                                                ? 'In behandeling'
                                                                                : 'In behandeling nemen'}
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </>
                                                ) : null}

                                                {user.inspectionPersonTypeId === 'coach' ||
                                                user.inspectionPersonTypeId === 'externalparty' ? (
                                                    <>
                                                        {initialQuotationRequest.opportunityAction.codeRef ===
                                                            'quotation-request' ||
                                                        initialQuotationRequest.opportunityAction.codeRef ===
                                                            'subsidy-request' ? (
                                                            <>
                                                                <FormLabel
                                                                    htmlFor="date_approved_external"
                                                                    className={'field-label'}
                                                                >
                                                                    Datum akkoord extern
                                                                </FormLabel>
                                                                <div style={{ display: 'flex' }}>
                                                                    <div>
                                                                        <Field
                                                                            name="dateApprovedExternal"
                                                                            render={({ field }) => (
                                                                                <InputTextDate
                                                                                    field={field}
                                                                                    type="date"
                                                                                    errors={errors}
                                                                                    touched={touched}
                                                                                    onChangeAction={setFieldValue}
                                                                                    id="date_approved_external"
                                                                                    placeholder={'Datum akkoord extern'}
                                                                                    readOnly={
                                                                                        approved ||
                                                                                        values.status?.codeRef ===
                                                                                            'approved'
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    {user.inspectionPersonTypeId === 'externalparty' ? (
                                                                        <div>
                                                                            <Button
                                                                                variant={
                                                                                    approved ||
                                                                                    values.status?.codeRef ===
                                                                                        'approved'
                                                                                        ? 'dark'
                                                                                        : 'outline-dark'
                                                                                }
                                                                                size="sm"
                                                                                onClick={() => {
                                                                                    // setFieldValue('status.id', 17);
                                                                                    setApproved(true);
                                                                                    setFieldValue(
                                                                                        'dateApprovedExternal',
                                                                                        moment().format('YYYY-MM-DD')
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {approved ||
                                                                                values.status?.codeRef === 'approved'
                                                                                    ? 'Goedgekeurd'
                                                                                    : 'Goedkeuren'}
                                                                            </Button>

                                                                            <Button
                                                                                variant={
                                                                                    notApproved ||
                                                                                    values.status?.codeRef ===
                                                                                        'not-approved'
                                                                                        ? 'dark'
                                                                                        : 'outline-dark'
                                                                                }
                                                                                size="sm"
                                                                                onClick={() => {
                                                                                    // setFieldValue('status.id', 18);
                                                                                    setNotApproved(true);
                                                                                    setFieldValue(
                                                                                        'dateApprovedExternal',
                                                                                        ''
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {notApproved ||
                                                                                values.status?.codeRef ===
                                                                                    'not-approved'
                                                                                    ? 'Afgekeurd'
                                                                                    : 'Niet Goedkeuren'}
                                                                            </Button>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </>
                                                ) : null}

                                                {user.inspectionPersonTypeId === 'externalparty' ? (
                                                    <>
                                                        <FormLabel className={'field-label'}>Opmerkingen</FormLabel>
                                                        <Field
                                                            name="externalpartyNote"
                                                            component="textarea"
                                                            className="form-control input-sm mb-2"
                                                        />
                                                    </>
                                                ) : null}
                                            </Col>
                                        </Row>
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
                                    </Form>
                                );
                            }}
                        />
                    </div>

                    <InspectDetailsDocumentTable
                        quotationRequestId={match.params.id}
                        documents={initialQuotationRequest.documents}
                        previewDocument={previewDocument}
                    />
                </>
            )}
        </Container>
    );
}

export default function InspectDetailsWithContext(props) {
    return <PortalUserConsumer>{({ user }) => <InspectDetails {...props} user={user} />}</PortalUserConsumer>;
}
