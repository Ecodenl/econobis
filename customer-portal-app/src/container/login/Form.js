import React from 'react';
import InputText from '../../components/form/InputText';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonText from '../../components/button/ButtonText';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Verplicht'),
});

const LoginForm = function({ handleSubmit, login }) {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                handleSubmit(values, actions, login);
            }}
            render={({ errors, touched, setFieldValue, isSubmitting }) => {
                return (
                    <Form>
                        <Field
                            name="email"
                            render={({ field /* _form */ }) => (
                                <InputText
                                    field={field}
                                    id="email"
                                    className={'text-input w-input'}
                                    placeholder={'email'}
                                />
                            )}
                        />
                        <Field
                            name="password"
                            render={({ field /* _form */ }) => (
                                <InputText
                                    field={field}
                                    id="password"
                                    className={'text-input w-input'}
                                    placeholder={'wachtwoord'}
                                />
                            )}
                        />
                        <ButtonText
                            buttonText={'Log in'}
                            buttonClassName={'login-button w-button'}
                            type={'submit'}
                            loading={isSubmitting}
                            loadingSpinnerColor={'#034b8c'}
                        />
                    </Form>
                );
            }}
        />
    );
};

export default LoginForm;
