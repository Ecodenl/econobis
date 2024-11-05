import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../components/general/LoadingView';
import { PortalUserContext } from '../../../context/PortalUserContext';
import PortalFreeFieldsPageAPI from '../../../api/portal-free-fields-page/PortalFreeFieldsPageAPI';
import { isEmpty } from 'lodash';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ContactAPI from '../../../api/contact/ContactAPI';
import axios from 'axios';
import FreeFields from '../../../components/freeFields/FreeFields';
import { Form, Formik } from 'formik';
import { checkFieldRecord } from '../../../helpers/FreeFieldsHelpers';
import { ClipLoader } from 'react-spinners';
import { Alert } from 'react-bootstrap';
import moment from 'moment';

function FreeFieldsPageDetails({ match, history }) {
    const { currentSelectedContact } = useContext(PortalUserContext);
    const [contact, setContact] = useState({});
    const [portalFreeFieldsPage, setPortalFreeFieldsPage] = useState({});
    const [portalFreeFieldsFieldRecords, setPortalFreeFieldsFieldRecords] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (currentSelectedContact.id) {
            callFetchFreeFieldsPage();
        }
    }, [match, currentSelectedContact]);

    function redirectBack() {
        // hier evt. terug naar dashboard?
        history.push('/dashboard');
    }

    function callFetchFreeFieldsPage() {
        setLoading(true);

        axios
            .all([
                PortalFreeFieldsPageAPI.fetchFreeFieldsPage(currentSelectedContact.id, match.params.urlPageRef),
                ContactAPI.fetchContactPortalFreeFields(currentSelectedContact.id, match.params.urlPageRef),
            ])
            .then(
                axios.spread((payloadFreeFieldsPage, payloadContactPortalFreeFields) => {
                    setPortalFreeFieldsPage(payloadFreeFieldsPage.data.data);
                    setPortalFreeFieldsFieldRecords(payloadContactPortalFreeFields.data);

                    // Set up initial freeFieldsFieldRecords inside contact
                    const initialPortalFreeFieldsFieldRecords = payloadContactPortalFreeFields.data.reduce(
                        (acc, record) => {
                            switch (record.fieldFormatType) {
                                case 'boolean':
                                    acc[`record-${record.id}`] = record.fieldRecordValueBoolean || null;
                                    break;
                                case 'text_short':
                                    acc[`record-${record.id}`] = record.fieldRecordValueText || null;
                                    break;
                                case 'text_long':
                                    acc[`record-${record.id}`] = record.fieldRecordValueText || null;
                                    break;
                                case 'int':
                                    acc[`record-${record.id}`] = record.fieldRecordValueInt || null;
                                    break;
                                case 'double_2_dec':
                                    acc[`record-${record.id}`] = record.fieldRecordValueDouble || null;
                                    break;
                                case 'amount_euro':
                                    acc[`record-${record.id}`] = record.fieldRecordValueDouble || null;
                                    break;
                                case 'date':
                                    acc[`record-${record.id}`] = record.fieldRecordValueDatetime
                                        ? moment(record.fieldRecordValueDatetime).format('YYYY-MM-DD')
                                        : null;
                                    break;
                                case 'datetime':
                                    acc[`record-${record.id}`] = record.fieldRecordValueDatetime || null;
                                    break;
                            }
                            return acc;
                        },
                        {}
                    );

                    let contactData = { ...currentSelectedContact };
                    contactData.freeFieldsFieldRecords = initialPortalFreeFieldsFieldRecords;
                    setContact(contactData);

                    setLoading(false);
                })
            )
            .catch(error => {
                setErrorMessage(
                    error?.response?.data?.message
                        ? error.response.data.message
                        : 'Er is iets misgegaan met laden. Herlaad de pagina opnieuw.'
                );
                setLoading(false);
            });
    }

    function handleSubmitContactFreeFieldsValues(values, actions, switchToView) {
        const updatedContact = { ...contact, ...values, projectId: null };

        PortalFreeFieldsPageAPI.updatePortalFreeFieldsPageValues(updatedContact.id, updatedContact)
            .then(payload => {
                callFetchFreeFieldsPage();
                actions.setSubmitting(false);
                switchToView();
            })
            .catch(error => {
                actions.setSubmitting(false);
                actions.setStatus({
                    message:
                        error.response?.data?.message || 'Er is iets misgegaan met opslaan! Herlaad de pagina opnieuw.',
                });
            });
    }

    if (errorMessage) {
        return (
            <div className={'content-section'}>
                <div className="content-container w-container">
                    {isLoading ? (
                        <LoadingView />
                    ) : (
                        <Row>
                            <Col>
                                <p>{errorMessage}</p>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        );
    }

    const validate = values => {
        const errors = { freeFieldsFieldRecords: {} };

        portalFreeFieldsFieldRecords.forEach(record => {
            const fieldValue = values.freeFieldsFieldRecords[`record-${record.id}`];

            let valueType = null;
            switch (record.fieldFormatType) {
                case 'boolean':
                    valueType = 'fieldRecordValueBoolean';
                    break;
                case 'text_short':
                case 'text_long':
                    valueType = 'fieldRecordValueText';
                    break;
                case 'int':
                    valueType = 'fieldRecordValueInt';
                    break;
                case 'double_2_dec':
                case 'amount_euro':
                    valueType = 'fieldRecordValueDouble';
                    break;
                case 'date':
                case 'datetime':
                    valueType = 'fieldRecordValueDatetime';
                    break;
            }

            // Check each field using your checkFieldRecord function
            const validationError = checkFieldRecord({
                ...record,
                [valueType]: fieldValue,
            });

            if (validationError) {
                // Set the error within the nested freeFieldsFieldRecords object
                errors.freeFieldsFieldRecords[`record-${record.id}`] = validationError;
            }
        });

        // Return the full errors object if there are errors; otherwise, return undefined
        return Object.keys(errors.freeFieldsFieldRecords).length > 0 ? errors : {};
    };

    return (
        <div className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <div className="content-container w-container">
                        <Row>
                            <Col>
                                <h1 className="content-heading mt-0">{portalFreeFieldsPage.name}</h1>
                            </Col>
                        </Row>
                        {!showEdit && (
                            <Row>
                                <Col>
                                    <ButtonGroup aria-label="free-fields-page" className={'float-left mb-3'}>
                                        <Button
                                            className={'w-button'}
                                            size="sm"
                                            onClick={function() {
                                                setShowEdit(true);
                                            }}
                                        >
                                            Wijzig
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        )}
                        <Row>
                            <Col>
                                {!isEmpty(portalFreeFieldsPage.description) ? (
                                    <p className={'text-left'} style={{ whiteSpace: 'break-spaces' }}>
                                        {portalFreeFieldsPage.description}
                                    </p>
                                ) : null}
                            </Col>
                        </Row>
                        <Formik
                            initialValues={contact}
                            validate={validate}
                            enableReinitialize={true}
                            validateOnChange={false} // Disable automatic validation
                            validateOnBlur={false} // Disable automatic validation on blur
                            onSubmit={(values, actions) => {
                                actions.setSubmitting(true);
                                handleSubmitContactFreeFieldsValues(values, actions, () => setShowEdit(false));
                            }}
                        >
                            {({
                                errors,
                                touched,
                                setFieldValue,
                                setFieldError,
                                setFieldTouched,
                                isSubmitting,
                                status,
                                values,
                                handleSubmit,
                            }) => {
                                return (
                                    <Form>
                                        <FreeFields
                                            freeFieldsFieldRecords={portalFreeFieldsFieldRecords}
                                            showEdit={showEdit}
                                            touched={touched}
                                            errors={errors}
                                            setFieldValue={setFieldValue}
                                            setFieldError={setFieldError}
                                            setFieldTouched={setFieldTouched}
                                            values={values}
                                            layout="double" // Renders in two columns
                                        />
                                        {showEdit ? (
                                            <>
                                                <Row>
                                                    <Col>
                                                        <ButtonGroup aria-label="free-fields" className="float-right">
                                                            <Button
                                                                variant={'outline-dark'}
                                                                size="sm"
                                                                onClick={function() {
                                                                    callFetchFreeFieldsPage();
                                                                    setShowEdit(false);
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
                                                {!isEmpty(errors) ? (
                                                    <Row>
                                                        <Col>
                                                            <div className="alert-wrapper">
                                                                <Alert
                                                                    key={'form-general-error-alert'}
                                                                    variant={'warning'}
                                                                >
                                                                    Niet alle verplichte velden zijn (juist) ingevuld!
                                                                </Alert>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                                {status && status.message ? (
                                                    <Row>
                                                        <Col>
                                                            <div className="alert-wrapper">
                                                                <Alert
                                                                    key={'form-general-error-alert'}
                                                                    variant={'danger'}
                                                                >
                                                                    {status.message}
                                                                </Alert>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                            </>
                                        ) : null}
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </>
            )}
        </div>
    );
}

export default FreeFieldsPageDetails;
