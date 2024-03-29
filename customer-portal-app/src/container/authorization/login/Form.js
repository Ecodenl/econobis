import React from 'react';
import InputText from '../../../components/form/InputText';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonText from '../../../components/button/ButtonText';

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .email()
        .required('Verplicht'),
    password: Yup.string().required('Verplicht'),
});

const LoginForm = function({ handleSubmit, login }) {
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                handleSubmit(values, actions, login);
            }}
        >
            {({ isSubmitting, errors, touched }) => {
                return (
                    <Form>
                        <Field name="username">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    id="username"
                                    className={''}
                                    placeholder={'E-mailadres'}
                                    errors={errors}
                                    touched={touched}
                                    // showErrorMessage={false}
                                />
                            )}
                        </Field>
                        <Field name="password">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    id="password"
                                    className={''}
                                    placeholder={'Wachtwoord'}
                                    type={'password'}
                                    errors={errors}
                                    touched={touched}
                                    // showErrorMessage={false}
                                />
                            )}
                        </Field>
                        <ButtonText
                            buttonText={'Log in'}
                            buttonClassName={'authorization-button'}
                            type={'submit'}
                            loading={isSubmitting}
                            loadingSpinnerColor={'#034b8c'}
                        />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LoginForm;
