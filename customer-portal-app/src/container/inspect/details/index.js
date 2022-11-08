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
import InputText from '../../../components/form/InputText';
import moment from 'moment';
import InputTextDate from '../../../components/form/InputTextDate';

function InspectDetails({ match, history }) {
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

    useEffect(() => {
        QuotationRequestAPI.fetchById(match.params.id).then(response => {
            setInitialQuotationRequest(response.data);
            setLoading(false);
        });
    }, []);

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
                                            <Col xs={12} md={12}>
                                                <FormLabel className={'field-label'}>Naam</FormLabel>
                                                <Row>
                                                    <Col xs={12} sm={8} md={6}>
                                                        <input
                                                            type="text"
                                                            className={`text-input w-input content`}
                                                            value={
                                                                initialQuotationRequest.opportunity.intake.contact
                                                                    .fullName
                                                            }
                                                            readOnly={true}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <FormLabel className={'field-label'}>Adres</FormLabel>
                                                <Row>
                                                    <Col xs={12} sm={8} md={6}>
                                                        <input
                                                            type="text"
                                                            className={`text-input w-input content`}
                                                            value={
                                                                initialQuotationRequest.opportunity.intake.address
                                                                    .streetPostalCodeCity
                                                            }
                                                            readOnly={true}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <FormLabel className={'field-label'}>Telefoon</FormLabel>
                                                <Row>
                                                    <Col xs={12} sm={8} md={6}>
                                                        <input
                                                            type="text"
                                                            className={`text-input w-input content`}
                                                            value={
                                                                initialQuotationRequest.opportunity.intake.contact
                                                                    .primaryphoneNumber
                                                            }
                                                            readOnly={true}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <FormLabel className={'field-label'}>Email</FormLabel>
                                                <Row>
                                                    <Col xs={12} sm={8} md={6}>
                                                        <input
                                                            type="text"
                                                            className={`text-input w-input content`}
                                                            value={
                                                                initialQuotationRequest.opportunity.intake.contact
                                                                    .primaryEmailAddress
                                                            }
                                                            readOnly={true}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <FormLabel className={'field-label'}>Status</FormLabel>
                                                <Row>
                                                    <Col xs={12} sm={8} md={6}>
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
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <FormLabel htmlFor="date_planned" className={'field-label'}>
                                                    Datum afspraak
                                                </FormLabel>
                                                <Row>
                                                    <Col xs={12} sm={8} md={6}>
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
                                                                />
                                                            )}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        {initialQuotationRequest.opportunityAction.codeRef === 'quotation-request' ? (
                                            <Row>
                                                <Col xs={12} md={12}>
                                                    <FormLabel htmlFor="date_recorded" className={'field-label'}>
                                                        Datum opname
                                                    </FormLabel>
                                                    <Row>
                                                        <Col xs={12} sm={8} md={6}>
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
                                                                    />
                                                                )}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        ) : null}
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <FormLabel htmlFor="date_approved_external" className={'field-label'}>
                                                    Datum akkoord extern
                                                </FormLabel>
                                                <Row>
                                                    <Col xs={12} sm={8} md={6}>
                                                        <Field
                                                            name="dateApprovedExternal"
                                                            render={({ field }) => (
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
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <FormLabel htmlFor="date_released" className={'field-label'}>
                                                    Datum offerte
                                                </FormLabel>
                                                <Row>
                                                    <Col xs={12} sm={8} md={6}>
                                                        <Field
                                                            name="dateReleased"
                                                            render={({ field }) => (
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
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        {initialQuotationRequest.opportunityAction.codeRef === 'subsidy-request' ? (
                                            <>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <FormLabel
                                                            htmlFor="date_approved_project_manager"
                                                            className={'field-label'}
                                                        >
                                                            Datum akkoord projectleider
                                                        </FormLabel>
                                                        <Row>
                                                            <Col xs={12} sm={8} md={6}>
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
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} md={12}>
                                                        <FormLabel
                                                            htmlFor="date_approved_client"
                                                            className={'field-label'}
                                                        >
                                                            Datum akkoord bewoner
                                                        </FormLabel>
                                                        <Row>
                                                            <Col xs={12} sm={8} md={6}>
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
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : null}
                                        <Row>
                                            <Col xs={12} sm={8} md={6}>
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
                </>
            )}
        </Container>
    );
}

export default InspectDetails;
