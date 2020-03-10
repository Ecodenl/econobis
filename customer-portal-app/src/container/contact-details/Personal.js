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
                    render={({ errors, touched, setFieldValue, isSubmitting, values, handleSubmit }) => {
                        return (
                            <Form>
                                <DefaultContactPersonalEdit
                                    portalSettings={portalSettings}
                                    initialContact={initialContact}
                                    touched={touched}
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                />
                                <Row>
                                    <Col>
                                        <ButtonGroup aria-label="Steps" className="float-right">
                                            <Button
                                                variant={'outline-dark'}
                                                size="sm"
                                                onClick={function() {
                                                    setEditForm(false);
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
                                                    Niet alle verplichten velden zijn (juist) ingevuld!
                                                </Alert>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : null}
                            </Form>
                        );
                    }}
                />
            ) : (
                <>
                    <DefaultContactPersonalView portalSettings={portalSettings} initialContact={initialContact} />
                    <Row>
                        <Col>{editButtonGroup}</Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default ContactDetailsPersonal;
