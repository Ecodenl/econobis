import React from 'react';
import { Field, Form, Formik } from 'formik';
import ButtonText from '../../components/button/ButtonText';

const MyAreasOfInterestForm = function({ handleSubmit, initialValues }) {
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                console.log(values);
            }}
            render={({ errors, touched, setFieldValue, isSubmitting, values }) => {
                return (
                    <Form id="email-form" name="email-form">
                        <div className="w-row">
                            <div className="w-col w-col-6">
                                <h6 className="heading-content">Mijn interessegebieden</h6>
                                <Field
                                    name="didAgreeAvg"
                                    render={({ field }) => (
                                        <label className="w-checkbox checkbox-fld">
                                            <input
                                                type="checkbox"
                                                {...field}
                                                id="did_agree_avg"
                                                checked={field.value}
                                                className="w-checkbox-input checkbox"
                                            />
                                            <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                                                Akkoord
                                            </span>
                                        </label>
                                    )}
                                />

                                <h6 className="heading-content">Deelname</h6>
                                <Field
                                    name="didAgreeAvg"
                                    render={({ field }) => (
                                        <label className="w-checkbox checkbox-fld">
                                            <input
                                                type="checkbox"
                                                {...field}
                                                id="did_agree_avg"
                                                checked={field.value}
                                                className="w-checkbox-input checkbox"
                                            />
                                            <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                                                Meewerken met BE
                                            </span>
                                        </label>
                                    )}
                                />

                                <h6 className="heading-content">Algemeen</h6>
                                <Field
                                    name="didAgreeAvg"
                                    render={({ field }) => (
                                        <label className="w-checkbox checkbox-fld">
                                            <input
                                                type="checkbox"
                                                {...field}
                                                id="did_agree_avg"
                                                checked={field.value}
                                                className="w-checkbox-input checkbox"
                                            />
                                            <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                                                Akkoord
                                            </span>
                                        </label>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="w-row">
                            <div className="w-col w-col-6">
                                <ButtonText
                                    buttonText={'Opslaan'}
                                    buttonClassName={'save-btn w-button'}
                                    type={'submit'}
                                    loading={isSubmitting}
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

export default MyAreasOfInterestForm;
