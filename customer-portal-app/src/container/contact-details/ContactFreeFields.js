import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PortalFreeFieldsPageAPI from '../../api/portal-free-fields-page/PortalFreeFieldsPageAPI';
import { isEmpty } from 'lodash';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import FreeFields from '../../components/freeFields/FreeFields';
import { Form, Formik } from 'formik';
import { checkFieldRecord } from '../../helpers/FreeFieldsHelpers';
import { Alert } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

function ContactFreeFields({ initialContact, contactFreeFieldsFieldRecords }) {
    const [showEdit, setShowEdit] = useState(false);

    function handleSubmitContactFreeFieldsValues(values, actions, switchToView) {
        const updatedContact = { ...initialContact, ...values, projectId: null };

        PortalFreeFieldsPageAPI.updatePortalFreeFieldsPageValues(updatedContact.id, updatedContact)
            .then(payload => {
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

    const validate = values => {
        const errors = { freeFieldsFieldRecords: {} };

        contactFreeFieldsFieldRecords.forEach(record => {
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
        <>
            <Row>
                <Col>
                    <h1 className="content-heading mt-0">Overig</h1>
                </Col>
                {!showEdit && (
                    <Col>
                        <ButtonGroup aria-label="free-fields-page" className={'float-right'}>
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
                )}
            </Row>

            <Formik
                initialValues={initialContact}
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
                                freeFieldsFieldRecords={contactFreeFieldsFieldRecords}
                                showEdit={showEdit}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                                setFieldError={setFieldError}
                                setFieldTouched={setFieldTouched}
                                values={values}
                                layout="double"
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
                                                        // here set contact free fields back to what it was
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
                                                    <Alert key={'form-general-error-alert'} variant={'warning'}>
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
                                                    <Alert key={'form-general-error-alert'} variant={'danger'}>
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
        </>
    );
}

export default ContactFreeFields;
