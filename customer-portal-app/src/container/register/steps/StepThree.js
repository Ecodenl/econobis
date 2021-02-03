import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Col from 'react-bootstrap/Col';
import { Alert } from 'react-bootstrap';
import { isEmpty } from 'lodash';

function StepThree({ project, contactProjectData, previous, next, initialRegisterValues, handleSubmitRegisterValues }) {
    const validationSchema = Yup.object({
        didAcceptAgreement: Yup.bool().test(
            'didAcceptAgreement',
            'Je dient akkoord te gaan met de voorwaarden!',
            value => value === true
        ),
        didUnderstandInfo: Yup.bool().test(
            'didUnderstandInfo',
            'Je dient te bevestigen, dat de project informatie gelezen en begrepen is!',
            value => value === true
        ),
    });

    return (
        <div>
            <Formik
                validationSchema={validationSchema}
                onSubmit={function(values, actions) {
                    handleSubmitRegisterValues(values);
                    next();
                }}
                initialValues={initialRegisterValues}
            >
                {({ handleSubmit, touched, errors }) => (
                    <>
                        <Form>
                            <Row>
                                <Col xs={12} md={10}>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: contactProjectData.textAgreeTermsMerged,
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={10}>
                                    <Field
                                        name="didAcceptAgreement"
                                        render={({ field }) => (
                                            <label className="w-checkbox checkbox-fld">
                                                <input
                                                    type="checkbox"
                                                    {...field}
                                                    id="did_accept_agreement"
                                                    checked={field.value}
                                                    className="w-checkbox-input checkbox"
                                                />
                                                <span
                                                    htmlFor="did_accept_agreement"
                                                    className="checkbox-label w-form-label"
                                                    dangerouslySetInnerHTML={{
                                                        __html: contactProjectData.textLinkAgreeTermsMerged,
                                                    }}
                                                />
                                                {touched[field.name] && errors[field.name] ? (
                                                    <div className={'error-message text-danger'}>
                                                        {errors[field.name]}
                                                    </div>
                                                ) : null}
                                            </label>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={10}>
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
                                                    dangerouslySetInnerHTML={{
                                                        __html: contactProjectData.textLinkUnderstandInfoMerged,
                                                    }}
                                                />
                                                {touched[field.name] && errors[field.name] ? (
                                                    <div className={'error-message text-danger'}>
                                                        {errors[field.name]}
                                                    </div>
                                                ) : null}
                                            </label>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={10}>
                                    <ButtonGroup aria-label="Steps" className="float-right">
                                        <Button className={'w-button'} size="sm" onClick={previous}>
                                            Terug
                                        </Button>
                                        <Button className={'w-button'} size="sm" onClick={handleSubmit}>
                                            Ga naar bevestigen
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            {!isEmpty(errors) ? (
                                <Row>
                                    <Col>
                                        <div className="alert-wrapper">
                                            <Alert key={'form-general-error-alert'} variant={'warning'}>
                                                Niet alle verplichten velden zijn ingevuld om verder te gaan naar de
                                                volgende stap!
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
}

export default StepThree;
