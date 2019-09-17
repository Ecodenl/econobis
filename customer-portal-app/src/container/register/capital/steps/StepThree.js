import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

function StepThree({ previous, next, initialRegisterValues, handleSubmitRegisterValues }) {
    const validationSchema = Yup.object({
        didAgreeTerms: Yup.bool().test(
            'didAgreeTerms',
            'Je dient akkoord te gaan met de voorwaarden!',
            value => value === true
        ),
        didUnderstandInfo: Yup.bool().test(
            'didUnderstandInfo',
            'Je dient te bevestigen, dat de projectinformatie gelezen en begrepen is!',
            value => value === true
        ),
    });

    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={function(values, actions) {
                handleSubmitRegisterValues(values);
                next();
            }}
            initialValues={initialRegisterValues}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => {
                return (
                    <>
                        <div>
                            <div className="w-row">
                                <div className="w-col w-col-6">
                                    <p>
                                        Om deel te kunnen nemen dien je akkoord te gaan met de algemene voorwaarden en
                                        dien je te bevestigen dat je de projectinformatie hebt gelezen en begrepen.
                                    </p>
                                    <Field
                                        name="didAgreeTerms"
                                        render={({ field }) => (
                                            <label className="w-checkbox checkbox-fld">
                                                <input
                                                    type="checkbox"
                                                    {...field}
                                                    id="did_agree_terms"
                                                    checked={field.value}
                                                    className="w-checkbox-input checkbox"
                                                />
                                                <span htmlFor="did_agree_terms" className="checkbox-label w-form-label">
                                                    Ik ga akkoord met de <a href="#">voorwaarden</a>
                                                </span>
                                                {touched.didAgreeTerms && errors.didAgreeTerms ? (
                                                    <div className={'error-message text-danger'}>
                                                        {errors.didAgreeTerms}
                                                    </div>
                                                ) : null}
                                            </label>
                                        )}
                                    />

                                    <Field
                                        name="didUnderstandInfo"
                                        render={({ field }) => (
                                            <label className="w-checkbox checkbox-fld">
                                                <input
                                                    type="checkbox"
                                                    {...field}
                                                    id="did_understand_info"
                                                    checked={field.value}
                                                    className="w-checkbox-input checkbox"
                                                />
                                                <span
                                                    htmlFor="did_understand_info"
                                                    className="checkbox-label w-form-label"
                                                >
                                                    Ik heb de <a href="#">projectinformatie</a> (inclusief de daarin
                                                    beschreven risico’s) behorende bij het project gelezen en begrepen
                                                </span>
                                                {touched.didUnderstandInfo && errors.didUnderstandInfo ? (
                                                    <div className={'error-message text-danger'}>
                                                        {errors.didUnderstandInfo}
                                                    </div>
                                                ) : null}
                                            </label>
                                        )}
                                    />
                                </div>
                            </div>
                            <Row className="justify-content-end">
                                <ButtonGroup aria-label="Steps">
                                    <Button className={'w-button'} size="sm" onClick={previous}>
                                        Terug
                                    </Button>
                                    <Button className={'w-button'} size="sm" onClick={handleSubmit}>
                                        Ga naar inschrijfformulier
                                    </Button>
                                </ButtonGroup>
                            </Row>
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}

export default StepThree;
