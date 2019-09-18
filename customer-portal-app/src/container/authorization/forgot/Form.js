import React from 'react';
import InputText from '../../../components/form/InputText';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonText from '../../../components/button/ButtonText';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Verplicht'),
});

const ForgotForm = ({ handleSubmit }) => (
    <Formik
        initialValues={{ email: '' }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleSubmit(values, actions);
        }}
        render={({ isSubmitting, errors, touched }) => (
            <Form>
                <Field
                    name="email"
                    render={({ field }) => (
                        <InputText
                            field={field}
                            id="email"
                            className={''}
                            placeholder={'E-mailadres'}
                            errors={errors}
                            touched={touched}
                            showErrorMessage={false}
                        />
                    )}
                />
                <ButtonText
                    buttonText={'Verzenden'}
                    buttonClassName={'login-button'}
                    size="sm"
                    type={'submit'}
                    loading={isSubmitting}
                    loadingSpinnerColor={'#034b8c'}
                />
            </Form>
        )}
    />
);

export default ForgotForm;
