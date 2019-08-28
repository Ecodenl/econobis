import React from 'react';
import InputText from '../../components/form/InputText';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonText from '../../components/button/ButtonText';

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
            render={({ errors, touched, setFieldValue, isSubmitting }) => {
                return (
                    <Form>
                        <Field
                            name="username"
                            render={({ field /* _form */ }) => (
                                <InputText
                                    field={field}
                                    id="username"
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
                                    type={'password'}
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
