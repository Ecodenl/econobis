import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ContactAPI from '../../../api/contact/ContactAPI';
import ViewHtmlAsText from '../../../components/general/ViewHtmlAsText';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../components/general/LoadingView';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ParticipantProjectAPI from '../../../api/participant-project/ParticipantProjectAPI';
import { ClipLoader } from 'react-spinners';
import { Alert } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import FormLabel from 'react-bootstrap/FormLabel';

function StepFour({ contactProjectData, previous, next, registerValues, setSucces, project }) {
    const [contactDocument, setContactDocument] = useState('');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        (function callFetchContact() {
            setLoading(true);
            ContactAPI.previewDocument(registerValues)
                .then(payload => {
                    setContactDocument(payload.data);
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();
    }, [registerValues]);

    function handleSubmitRegisterValues(actions, next) {
        ParticipantProjectAPI.createParticipantProject(registerValues)
            .then(payload => {
                // console.log(payload);
                actions.setSubmitting(false);
                setSucces(true);
                next();
            })
            .catch(error => {
                alert('Er is iets misgegaan met opslaan! Herlaad de pagina opnieuw.');
                actions.setSubmitting(false);
            });
    }

    const validationSchema = Yup.object({
        didAgreeRegistration: Yup.bool().test(
            'didAgreeRegistration',
            'Je dient akkoord te gaan met het inschrijfformulier!',
            value => value === true
        ),
    });

    let contactDocumentOk = false;
    if (!isEmpty('' + contactDocument)) {
        contactDocumentOk = true;
    }

    return (
        <>
            {isLoading ? (
                <LoadingView />
            ) : !contactDocumentOk ? (
                <>
                    <Row>
                        <Col>Er ging iets mis bij het maken van het bevestingsformulier voorbeeld.</Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <ButtonGroup aria-label="Steps" className="float-right">
                                <Button className={'w-button'} size="sm" onClick={previous}>
                                    Terug
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            ) : (
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={function(values, actions) {
                        handleSubmitRegisterValues(actions, next);
                    }}
                    initialValues={{ didAgreeRegistration: false }}
                >
                    {({ handleSubmit, touched, errors, isSubmitting }) => (
                        <>
                            <Form>
                                <Row>
                                    <Col xs={12} md={10}>
                                        <FormLabel className={'field-label'}>Controleer de inschrijving</FormLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={10}>
                                        <ViewHtmlAsText value={contactDocument} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={10}>
                                        <p>{contactProjectData.textAcceptAgreementMerged}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={10}>
                                        <Field
                                            name="didAgreeRegistration"
                                            render={({ field }) => (
                                                <label className="w-checkbox checkbox-fld">
                                                    <input
                                                        type="checkbox"
                                                        {...field}
                                                        id="did_agree_registration"
                                                        checked={field.value}
                                                        className="w-checkbox-input checkbox"
                                                    />
                                                    <span
                                                        htmlFor="did_agree_registration"
                                                        className="checkbox-label w-form-label"
                                                    >
                                                        {contactProjectData.textAcceptAgreementQuestionMerged}
                                                    </span>
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
                                            <Button
                                                className={'w-button'}
                                                size="sm"
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <span>
                                                        <ClipLoader color={'white'} size={14} />
                                                        Bezig met verwerken
                                                    </span>
                                                ) : (
                                                    <>
                                                        {
                                                            project.usesMollie ? (
                                                                <>Betaal en bevestig de inschrijving</>
                                                            ) : (
                                                                <>Bevestig inschrijving</>
                                                            )
                                                        }
                                                    </>
                                                )}
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
            )}
        </>
    );
}

export default StepFour;
