import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PortalUserAPI from '../../../api/portal-user/PortalUserAPI';
import Alert from 'react-bootstrap/Alert';

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(10, 'Minimum van ${min} verplicht')
        .matches(/([0-9])/, 'Minimaal 1 cijfer is verplicht')
        .matches(/([A-Z])/, 'Minimaal 1 hoofdletter is verplicht')
        .required('Verplicht'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Wachtwoorden moeten gelijk zijn')
        .required('Verplicht'),
});

function ChangeAccountPassword() {
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);
    const [showError, toggleError] = useState(false);

    function handleSubmitChangePassword(values, actions) {
        PortalUserAPI.changePassword(values)
            .then(payload => {
                actions.resetForm();
                toggleError(false);
                toggleSuccessMessage(true);
                actions.setSubmitting(false);
            })
            .catch(error => {
                actions.setSubmitting(false);
                toggleError(true);
                toggleSuccessMessage(false);
            });
    }

    return (
        <Formik
            initialValues={{ password: '', passwordConfirmation: '' }}
            validationSchema={validationSchema}
            onSubmit={function(values, actions) {
                handleSubmitChangePassword(values, actions);
            }}
        >
            {({ touched, errors, isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    {showSuccessMessage ? (
                        <Row>
                            <Col xs={12}>
                                <Alert className={'p-1 m-1 text-success'} variant={'success'}>
                                    Wachtwoord is succesvol gewijzigd!
                                </Alert>
                            </Col>
                        </Row>
                    ) : null}
                    {showError ? (
                        <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                            Fout bij wijzigen wachtwoord!
                        </Alert>
                    ) : null}

                    <Row>
                        <Col xs={12} md={9}>
                            <Form.Label className={'field-label'}>Nieuw wachtwoord</Form.Label>
                            <Field name="password">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        id="password"
                                        className={field.value ? 'content numeric-password' : 'content'}
                                        placeholder={'Nieuw wachtwoord'}
                                        errors={errors}
                                        touched={touched}
                                        type={'password'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={9}>
                            <Form.Label className={'field-label mt-0'}>Herhaal nieuw wachtwoord</Form.Label>
                            <Field name="passwordConfirmation">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        id="passwordConfirmation"
                                        className={field.value ? 'content numeric-password' : 'content'}
                                        placeholder={'Herhaal nieuw wachtwoord'}
                                        errors={errors}
                                        touched={touched}
                                        type={'password'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6}>
                            <ButtonText
                                buttonText={'Wijzig wachtwoord'}
                                size="sm"
                                type={'submit'}
                                loading={isSubmitting}
                            />
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default ChangeAccountPassword;
