import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DefaultContactPersonalView from './default-form-personal/View';
import DefaultContactPersonalEdit from './default-form-personal/Edit';
import Col from 'react-bootstrap/Col';
import { Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import ValidationSchemaPersonal from './../../helpers/ValidationSchemaPersonal';
import { isEmpty } from 'lodash';
import { Alert } from 'react-bootstrap';

function ContactDetailsPersonal({
    portalSettings,
    initialContact,
    freeFieldsFieldRecords,
    handleSubmitContactValues,
    editButtonGroup,
    editForm,
    setEditForm,
}) {
    const validationSchema = initialContact.isParticipantPcrProject
        ? ValidationSchemaPersonal.validationSchemaBasic
              .concat(ValidationSchemaPersonal.validationSchemaAdditional)
              .concat(ValidationSchemaPersonal.validationSchemaPcrAdditional)
        : initialContact.isParticipant
        ? ValidationSchemaPersonal.validationSchemaBasic.concat(ValidationSchemaPersonal.validationSchemaAdditional)
        : ValidationSchemaPersonal.validationSchemaBasic;

    return (
        <div>
            {editForm ? (
                <Formik
                    initialValues={initialContact}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        handleSubmitContactValues(values, actions, () => setEditForm(false));
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
                        const saveButtonGroup = (
                            <ButtonGroup aria-label="personal" className="float-right">
                                <Button
                                    variant={'outline-dark'}
                                    size="sm"
                                    onClick={function() {
                                        setEditForm(false);
                                    }}
                                >
                                    Annuleren
                                </Button>
                                <Button className={'w-button'} size="sm" onClick={handleSubmit} disabled={isSubmitting}>
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
                        );

                        return (
                            <Form>
                                <DefaultContactPersonalEdit
                                    portalSettings={portalSettings}
                                    initialContact={initialContact}
                                    freeFieldsFieldRecords={freeFieldsFieldRecords}
                                    saveButtonGroup={saveButtonGroup}
                                    touched={touched}
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                    setFieldError={setFieldError}
                                    setFieldTouched={setFieldTouched}
                                    values={values}
                                />
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
                            </Form>
                        );
                    }}
                </Formik>
            ) : (
                <>
                    <DefaultContactPersonalView
                        portalSettings={portalSettings}
                        initialContact={initialContact}
                        freeFieldsFieldRecords={freeFieldsFieldRecords}
                        editButtonGroup={editButtonGroup}
                    />
                </>
            )}
        </div>
    );
}

export default ContactDetailsPersonal;
