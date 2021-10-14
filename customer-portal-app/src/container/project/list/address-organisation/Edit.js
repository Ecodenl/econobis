import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import { Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import ValidationSchemaOrganisation from '../../../../helpers/ValidationSchemaOrganisation';
import { isEmpty } from 'lodash';
import { Alert } from 'react-bootstrap';
import InputText from '../../../../components/form/InputText';
import { Field } from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import { Link } from 'react-router-dom';

function OrganisationAddressEdit({ initialContact, handleSubmitContactAddressValues }) {
    const validationSchema = ValidationSchemaOrganisation.validationSchemaPostalCodeAndNumber;
    return (
        <div>
            <Formik
                initialValues={initialContact}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    handleSubmitContactAddressValues(values, actions);
                }}
                render={({ errors, touched, setFieldValue, isSubmitting, status, values, handleSubmit }) => {
                    return (
                        <Form>
                            <Row>
                                <Col>
                                    <div className="alert-wrapper">
                                        <Alert key={'form-general-error-alert'} variant={'warning'}>
                                            Op dit moment zijn je adresgegevens nog niet bij ons bekend.
                                            <br />
                                            Er zijn projecten waarop je kan inschrijven die afhankelijk van je adres
                                            zijn.
                                        </Alert>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12}>
                                    <FormLabel className={'field-label'}>Postcode en huisnummer</FormLabel>
                                    <Row>
                                        <Col xs={12} sm={4}>
                                            <Field
                                                name="visitAddress.number"
                                                render={({ field }) => (
                                                    <InputText
                                                        field={field}
                                                        errors={errors}
                                                        touched={touched}
                                                        id="street_number"
                                                        placeholder={'Nummer'}
                                                    />
                                                )}
                                            />
                                        </Col>
                                        <Col xs={12} sm={4}>
                                            <Field
                                                name="visitAddress.addition"
                                                render={({ field }) => (
                                                    <InputText
                                                        field={field}
                                                        errors={errors}
                                                        touched={touched}
                                                        id="addition"
                                                        placeholder={'Toevoeging'}
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={4}>
                                            <Field
                                                name="visitAddress.postalCode"
                                                render={({ field }) => (
                                                    <InputText
                                                        field={field}
                                                        errors={errors}
                                                        touched={touched}
                                                        id="postal_code"
                                                        placeholder={'Postcode'}
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <ButtonGroup aria-label="Steps" className="float-right">
                                        <Link to={`/`}>
                                            <Button variant={'outline-dark'} size="sm">
                                                Annuleren
                                            </Button>
                                        </Link>
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
                        </Form>
                    );
                }}
            />
        </div>
    );
}

export default OrganisationAddressEdit;
