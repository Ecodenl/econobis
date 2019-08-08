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

const AccountInfoForm = function({ handleSubmit, login }) {
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
                    <Form id="email-form" name="email-form">
                        <h6 className="heading-content">Contactnummer</h6>
                        <div className="text-block">[ client_nr ]</div>
                        <label htmlFor="email" className="field-label">
                            Inloggegevens
                        </label>
                        <Field
                            name="email"
                            render={({ field /* _form */ }) => (
                                <InputText
                                    field={field}
                                    id="email"
                                    placeholder={'email'}
                                    className={'text-input content w-input'}
                                />
                            )}
                        />
                        <Field
                            name="password"
                            render={({ field /* _form */ }) => (
                                <InputText
                                    field={field}
                                    id="password"
                                    placeholder={'wachtwoord'}
                                    className={'text-input content w-input'}
                                />
                            )}
                        />
                        <div className="w-row">
                            <div className="w-col w-col-6">
                                <ButtonText
                                    buttonText={'Opslaan'}
                                    buttonClassName={'save-btn w-button'}
                                    type={'submit'}
                                    loading={isSubmitting}
                                    loadingSpinnerColor={'#034b8c'}
                                />
                            </div>
                            <div className="w-col w-col-6" />
                        </div>
                    </Form>
                );
            }}
        />
    );
};

export default AccountInfoForm;
