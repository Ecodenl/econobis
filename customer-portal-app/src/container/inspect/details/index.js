import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../components/general/LoadingView';
import {Field, Form, Formik} from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import * as Yup from 'yup';
import QuotationRequestAPI from '../../../api/quotation-request/QuotationRequestAPI';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {ClipLoader} from 'react-spinners';
import InputText from '../../../components/form/InputText';
import moment from 'moment';
import InputTextDate from '../../../components/form/InputTextDate';
import fileDownload from "js-file-download";

function InspectDetails({match, history}) {
    const [isLoading, setLoading] = useState(true);
    const [initialQuotationRequest, setInitialQuotationRequest] = useState({});

    const validationSchema = Yup.object().shape({});

    const handleSubmit = (values, actions) => {
        QuotationRequestAPI.update({
            id: match.params.id,
            dateRecorded: values.dateRecorded,
            datePlanned: values.datePlanned,
            dateApprovedExternal: values.dateApprovedExternal,
            dateReleased: values.dateReleased,
        }).then(response => {
            history.push('/schouwen');
        });
    };

    const downloadDocument = (document) => {
        QuotationRequestAPI.downloadDocument(match.params.id, document.id).then(payload => {
            fileDownload(payload.data, document.filename);
        });
    }

    useEffect(() => {
        QuotationRequestAPI.fetchById(match.params.id).then(response => {
            setInitialQuotationRequest(response.data);
            setLoading(false);
        });
    }, []);

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView/>
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
                                            <Col xs={12} sm={8} md={6}>
                                                <FormLabel className={'field-label'}>Naams</FormLabel>
                                                <input
                                                    type="text"
                                                    className={`text-input w-input content`}
                                                    value={
                                                        initialQuotationRequest.opportunity.intake.contact
                                                            .fullName
                                                    }
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
                                                <input
                                                    type="text"
                                                    className={`text-input w-input content`}
                                                    value={
                                                                initialQuotationRequest.opportunityAction.name +
                                                                ' - ' +
                                                                initialQuotationRequest.opportunity.status.name
                                                            }
                                                    readOnly={true}
                                                />
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
                                                {initialQuotationRequest.opportunityAction.codeRef === 'quotation-request' ? (
                                                    <>
                                                        <FormLabel htmlFor="date_recorded" className={'field-label'}>
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
                                                <FormLabel htmlFor="date_approved_external" className={'field-label'}>
                                                    Datum akkoord extern
                                                </FormLabel>
                                                <Field
                                                    name="dateApprovedExternal"
                                                    render={({field}) => (
                                                        <InputText
                                                            name="dateApprovedExternal"
                                                            field={field}
                                                            type="date"
                                                            errors={errors}
                                                            touched={touched}
                                                            onChangeAction={setFieldValue}
                                                            id="date_approved_external"
                                                            placeholder={'Datum akkoord extern'}
                                                        />
                                                    )}
                                                />
                                                <FormLabel htmlFor="date_released" className={'field-label'}>
                                                    Datum offerte
                                                </FormLabel>
                                                <Field
                                                    name="dateReleased"
                                                    render={({field}) => (
                                                        <InputText
                                                            name="dateReleased"
                                                            field={field}
                                                            type="date"
                                                            errors={errors}
                                                            touched={touched}
                                                            onChangeAction={setFieldValue}
                                                            id="date_released"
                                                            placeholder={'Datum offerte'}
                                                        />
                                                    )}
                                                />
                                                {initialQuotationRequest.opportunityAction.codeRef === 'subsidy-request' ? (
                                                    <>
                                                        <FormLabel
                                                            htmlFor="date_approved_project_manager"
                                                            className={'field-label'}
                                                        >
                                                            Datum akkoord projectleider
                                                        </FormLabel>
                                                        <input
                                                            type="text"
                                                            className={`text-input w-input content`}
                                                            value={
                                                                initialQuotationRequest.dateApprovedProjectManager
                                                                    ? moment(
                                                                        initialQuotationRequest.dateApprovedProjectManager
                                                                    ).format('L')
                                                                    : ''
                                                            }
                                                            readOnly={true}
                                                        />
                                                        <FormLabel
                                                            htmlFor="date_approved_client"
                                                            className={'field-label'}
                                                        >
                                                            Datum akkoord bewoner
                                                        </FormLabel>
                                                        <input
                                                            type="text"
                                                            className={`text-input w-input content`}
                                                            value={
                                                                initialQuotationRequest.dateApprovedClient
                                                                    ? moment(
                                                                        initialQuotationRequest.dateApprovedClient
                                                                    ).format('L')
                                                                    : ''
                                                            }
                                                            readOnly={true}
                                                        />
                                                    </>
                                                ) : null}
                                            </Col>
                                            <Col xs={12} sm={8} md={6}>
                                                <FormLabel>
                                                    Bestanden
                                                </FormLabel>
                                                <ul>
                                                    {
                                                        initialQuotationRequest.documents.map((document) => {
                                                            return (
                                                                <li key={document.id}>
                                                                    <a role="button" onClick={() => downloadDocument(document)}>
                                                                        {document.filename}
                                                                    </a>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={8} md={6}>
                                                <ButtonGroup className="float-right">
                                                    <Button
                                                        variant={'outline-dark'}
                                                        size="sm"
                                                        onClick={function () {
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
                                                                <ClipLoader color={'white'} size={14}/>
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
                </>
            )}
        </Container>
    );
}

export default InspectDetails;
