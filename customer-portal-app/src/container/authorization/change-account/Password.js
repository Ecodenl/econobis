import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import FormLabel from 'react-bootstrap/FormLabel';
import TextBlock from '../../../components/general/TextBlock';

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
    // function handleSubmitChangePassword

    return (
        <Formik
            initialValues={{ password: '', passwordConfirmation: '' }}
            validationSchema={validationSchema}
            onSubmit={function(values, actions) {
                // handleSubmitChangePassword(values);
            }}
        >
            {({ touched, errors, isSubmitting }) => (
                <Form>
                    <Row>
                        <Col xs={12} md={9}>
                            <Form.Label className={'field-label'}>Nieuw wachtwoord</Form.Label>
                            <Field
                                name="password"
                                render={({ field }) => (
                                    <InputText
                                        field={field}
                                        id="password"
                                        className={field.value ? 'content numeric-password' : 'content'}
                                        placeholder={'Nieuw wachtwoord'}
                                        errors={errors}
                                        touched={touched}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={9}>
                            <Form.Label className={'field-label mt-0'}>Herhaal nieuw wachtwoord</Form.Label>
                            <Field
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <InputText
                                        field={field}
                                        id="passwordConfirmation"
                                        className={field.value ? 'content numeric-password' : 'content'}
                                        placeholder={'Herhaal nieuw wachtwoord'}
                                        errors={errors}
                                        touched={touched}
                                    />
                                )}
                            />
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
