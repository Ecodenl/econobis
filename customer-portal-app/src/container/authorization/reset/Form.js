import React from 'react';
import InputText from '../../../components/form/InputText';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonText from '../../../components/button/ButtonText';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

const ResetForm = ({ handleSubmit, email }) => (
    <Formik
        initialValues={{ password: '', passwordConfirmation: '' }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleSubmit(values, actions);
        }}
    >
        {({ isSubmitting, errors, touched }) => (
            <Form>
                <Row className="justify-content-center">
                    <p className={'authorization-text'}>
                        Stel een nieuw wachtwoord in voor <strong>{email}</strong>. Daarna ben je direct ingelogd.
                    </p>
                </Row>
                <Row className="justify-content-center">
                    <Field name="password">
                        {({ field }) => (
                            <InputText
                                field={field}
                                id="password"
                                className={field.value ? 'numeric-password' : ''}
                                placeholder={'Nieuw wachtwoord'}
                                errors={errors}
                                touched={touched}
                                classNameErrorMessage={'authorization-text'}
                                type={'password'}
                            />
                        )}
                    </Field>
                </Row>
                <Row className="justify-content-center">
                    <Field name="passwordConfirmation">
                        {({ field }) => (
                            <InputText
                                field={field}
                                id="passwordConfirmation"
                                className={field.value ? 'numeric-password' : ''}
                                placeholder={'Herhaal nieuw wachtwoord'}
                                errors={errors}
                                touched={touched}
                                classNameErrorMessage={'authorization-text mb-3'}
                                type={'password'}
                            />
                        )}
                    </Field>
                </Row>
                <Row className="justify-content-center">
                    <small className={'authorization-text'}>
                        Het wachtwoord moet minimaal 10 karakters lang zijn en moet minimaal 1 cijfer en 1 hoofdletter
                        bevatten.
                    </small>
                </Row>
                <Row className="justify-content-center">
                    <ButtonText
                        buttonText={'Verzenden'}
                        buttonClassName={'authorization-button'}
                        size="sm"
                        type={'submit'}
                        loading={isSubmitting}
                        loadingSpinnerColor={'#034b8c'}
                    />
                </Row>
            </Form>
        )}
    </Formik>
);

export default ResetForm;
