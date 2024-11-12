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
import TextBlock from '../../../components/general/TextBlock';
import MoneyPresenter from '../../../helpers/MoneyPresenter';

function StepFour({ project, registerType, contactProjectData, previous, next, registerValues, setSucces }) {
    const [contactDocument, setContactDocument] = useState('');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        (function callFetchContact() {
            setLoading(true);
            ContactAPI.previewDocument(registerValues, registerType)
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
        ParticipantProjectAPI.createParticipantProject(registerValues, registerType)
            .then(payload => {
                actions.setSubmitting(false);

                /**
                 * Als Mollie is ingeschakeld voor het project wordt er een betaallink gereturned.
                 * In dat geval huidige scherm verlaten en door naar mollie.
                 */
                if (payload.data.econobisPaymentLink) {
                    window.location.href = payload.data.econobisPaymentLink;
                    return;
                }

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
                    {({ handleSubmit, touched, errors, isSubmitting, status }) => (
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
                                    <Col xs={12} md={3}>
                                        <FormLabel className={'field-label-text'}>
                                            {project.transactionCostsCodeRef === 'none'
                                                ? 'Te betalen bedrag'
                                                : 'Bedrag'}
                                        </FormLabel>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <TextBlock className={'float-right'}>
                                            {MoneyPresenter(registerValues.amount)}
                                        </TextBlock>
                                    </Col>
                                </Row>
                                {project.transactionCostsCodeRef !== 'none' ? (
                                    <>
                                        <Row>
                                            <Col xs={12} md={3}>
                                                <FormLabel className={'field-label-text'}>
                                                    {project.textTransactionCosts}
                                                </FormLabel>
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <TextBlock className={'float-right'}>
                                                    {MoneyPresenter(registerValues.transactionCostsAmount)}
                                                </TextBlock>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={3}>
                                                <FormLabel className={'field-label-text'}>Totaal te betalen</FormLabel>
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <TextBlock className={'float-right'}>
                                                    {MoneyPresenter(registerValues.totalAmount)}
                                                </TextBlock>
                                            </Col>
                                        </Row>
                                    </>
                                ) : null}
                                <hr />
                                <Row>
                                    <Col xs={12} md={10}>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: contactProjectData.textAcceptAgreementMerged.replace(
                                                    /\n/g,
                                                    '<br />'
                                                ),
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={10}>
                                        <Field name="didAgreeRegistration">
                                            {({ field }) => (
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
                                        </Field>
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
                                                        {project.usesMollie ? (
                                                            <>
                                                                Betaal en bevestig de{' '}
                                                                {registerType === 'verhogen'
                                                                    ? 'bijschrijving'
                                                                    : 'inschrijving'}
                                                            </>
                                                        ) : (
                                                            <>
                                                                Bevestig{' '}
                                                                {registerType === 'verhogen'
                                                                    ? 'bijschrijving'
                                                                    : 'inschrijving'}
                                                            </>
                                                        )}
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
                                                    Niet alle verplichte velden zijn ingevuld om verder te gaan naar de
                                                    volgende stap!
                                                </Alert>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : null}
                                {status && status.message ? (
                                    <Row>
                                        <Col>
                                            <div className="alert-wrapper">
                                                <Alert key={'form-general-error-alert'} variant={'danger'}>
                                                    {status.message}
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
