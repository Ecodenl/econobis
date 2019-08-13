import React from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
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
                                <FieldArray
                                    name="myAreasOfInterest"
                                    render={arrayHelpers => (
                                        <div>
                                            {values.myAreasOfInterest &&
                                                values.myAreasOfInterest.map((myAreaOfInterest, index) => (
                                                    <div key={index}>
                                                        <Field
                                                            name={`myAreasOfInterest[${index}]['value']`}
                                                            render={({ field }) => (
                                                                <label className="w-checkbox checkbox-fld">
                                                                    <input
                                                                        type="checkbox"
                                                                        {...field}
                                                                        id={myAreaOfInterest.name}
                                                                        checked={myAreaOfInterest.value}
                                                                        className="w-checkbox-input checkbox"
                                                                    />
                                                                    <span
                                                                        htmlFor={myAreaOfInterest.name}
                                                                        className="checkbox-label w-form-label"
                                                                    >
                                                                        {myAreaOfInterest.name}
                                                                    </span>
                                                                </label>
                                                            )}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                />

                                <h6 className="heading-content">Deelname</h6>
                                <FieldArray
                                    name="participations"
                                    render={arrayHelpers => (
                                        <div>
                                            {values.participations &&
                                                values.participations.map((participation, index) => (
                                                    <div key={index}>
                                                        <Field
                                                            name={`participations[${index}]['value']`}
                                                            render={({ field }) => (
                                                                <label className="w-checkbox checkbox-fld">
                                                                    <input
                                                                        type="checkbox"
                                                                        {...field}
                                                                        id={participation.name}
                                                                        checked={participation.value}
                                                                        className="w-checkbox-input checkbox"
                                                                    />
                                                                    <span
                                                                        htmlFor={participation.name}
                                                                        className="checkbox-label w-form-label"
                                                                    >
                                                                        {participation.name}
                                                                    </span>
                                                                </label>
                                                            )}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                />

                                <h6 className="heading-content">Algemeen</h6>
                                <FieldArray
                                    name="generalOptions"
                                    render={arrayHelpers => (
                                        <div>
                                            {values.generalOptions &&
                                                values.generalOptions.map((generalOption, index) => (
                                                    <div key={index}>
                                                        <Field
                                                            name={`generalOptions[${index}]['value']`}
                                                            render={({ field }) => (
                                                                <label className="w-checkbox checkbox-fld">
                                                                    <input
                                                                        type="checkbox"
                                                                        {...field}
                                                                        id={generalOption.name}
                                                                        checked={generalOption.value}
                                                                        className="w-checkbox-input checkbox"
                                                                    />
                                                                    <span
                                                                        htmlFor={generalOption.name}
                                                                        className="checkbox-label w-form-label"
                                                                    >
                                                                        {generalOption.name}
                                                                    </span>
                                                                </label>
                                                            )}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
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
